const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://timizia.onrender.com/api";

export interface APIError {
  type: string;
  errors: Array<{
    attr: string | null;
    code: string;
    detail: string;
  }>;
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    // Normalize baseURL: remove trailing slashes
    this.baseURL = baseURL.replace(/\/+$|\s+$/g, "").replace(/\s+/g, "");
  }

  private getHeaders(authenticated: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (authenticated) {
      const token = this.getAccessToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  }

  private getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refresh_token");
  }

  private setTokens(access: string, refresh?: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem("access_token", access);
    if (refresh) {
      localStorage.setItem("refresh_token", refresh);
    }
  }

  private clearTokens() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  async refreshAccessToken(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) return false;

      const response = await fetch(`${this.baseURL}/auth/token/refresh/`, {
        method: "POST",
        headers: this.getHeaders(false),
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      this.setTokens(data.access);
      return true;
    } catch {
      return false;
    }
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    authenticated: boolean = false
  ): Promise<T> {
    // Ensure endpoint starts with a single '/'
    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;
    const url = `${this.baseURL}${normalizedEndpoint}`;
    const config: RequestInit = {
      ...options,
      headers: this.getHeaders(authenticated),
    };

    try {
      let response = await fetch(url, config);

      // If 401 and authenticated, try to refresh token
      if (response.status === 401 && authenticated) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          // Retry with new token
          config.headers = this.getHeaders(authenticated);
          response = await fetch(url, config);
        } else {
          // Refresh failed, clear tokens and redirect to login
          this.clearTokens();
          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }
          throw new Error("401 Session expired. Please login again.");
        }
      }

      if (!response.ok) {
        // Try to parse structured error, but include status for callers
        const parsed = await response.json().catch(() => null);
        const firstError = parsed?.errors?.[0];
        const message =
          firstError?.detail || response.statusText || "An error occurred";
        throw new Error(`${response.status} ${message}`);
      }

      return (await response.json()) as T;
    } catch (err: unknown) {
      // Re-throw so callers can handle errors
      throw err;
    }
  }

  // Try to decode a JWT access token payload (no verification) to extract common user id claims
  private decodeJwtPayload(token: string): Record<string, unknown> | null {
    try {
      const parts = token.split(".");
      if (parts.length < 2) return null;
      const payload = parts[1];
      let json: string;
      if (typeof window !== "undefined" && typeof atob === "function") {
        json = decodeURIComponent(
          Array.prototype.map
            .call(
              atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
              function (c: string) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              }
            )
            .join("")
        );
      } else {
        // Node environment
        json = Buffer.from(
          payload.replace(/-/g, "+").replace(/_/g, "/"),
          "base64"
        ).toString("utf8");
      }
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  // Auth methods
  async register(data: { name: string; email: string; password: string }) {
    const response = await this.request<{ name: string; email: string }>(
      "/auth/register/",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return response;
  }

  async login(email: string, password: string) {
    const response = await this.request<{ access: string; refresh: string }>(
      "/auth/token/",
      {
        method: "POST",
        body: JSON.stringify({ username: email, password }),
      }
    );
    this.setTokens(response.access, response.refresh);
    return response;
  }

  async resetPassword(email: string, password: string) {
    return this.request<{ email: string }>("/auth/reset_password/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async changePassword(
    email: string,
    currentPassword: string,
    newPassword: string
  ) {
    return this.request<{ email: string }>(
      "/auth/change_password/",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          current_password: currentPassword,
          new_password: newPassword,
        }),
      },
      true
    );
  }

  logout() {
    this.clearTokens();
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  }

  // User methods
  async getCurrentUser() {
    // Only attempt to decode user id from access token and call /users/{id}/ if possible.

    const token = this.getAccessToken();
    if (!token) return null;

    const payload = this.decodeJwtPayload(token) as Record<
      string,
      unknown
    > | null;

    const safeGetString = (
      obj: Record<string, unknown> | null,
      key: string
    ): string | null => {
      if (!obj) return null;
      const v = obj[key];
      return typeof v === "string" ? v : null;
    };

    const possibleIdFromUser = ((): string | null => {
      const user = payload ? payload["user"] : null;
      if (user && typeof user === "object") {
        const id = (user as Record<string, unknown>)["id"];
        return typeof id === "string" ? id : null;
      }
      return null;
    })();

    const possibleId =
      safeGetString(payload, "user_id") ||
      possibleIdFromUser ||
      safeGetString(payload, "sub") ||
      safeGetString(payload, "id") ||
      null;

    if (!possibleId) return null;

    try {
      return await this.request<{
        id: string;
        email: string;
        name: string;
        username: string;
      }>(`/users/${possibleId}/`, { method: "GET" }, Boolean(token));
    } catch {
      // If fetching by id fails, treat as unauthenticated / not found
      return null;
    }
  }

  async getUsers(page: number = 1) {
    return this.request<{
      count: number;
      next: string | null;
      previous: string | null;
      results: Array<{ email: string; name: string; username: string }>;
    }>(`/users/?page=${page}`, { method: "GET" }, true);
  }

  async getUserById(id: string) {
    return this.request<{ email: string; name: string; username: string }>(
      `/users/${id}/`,
      { method: "GET" },
      true
    );
  }
}

export const apiClient = new APIClient(API_BASE_URL);
