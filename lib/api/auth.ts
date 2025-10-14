
import { apiClient } from "./client";

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export async function signupUser(data: RegisterData) {
  return apiClient.register({
    name: data.fullName,
    email: data.email,
    password: data.password,
  });
}

export async function loginUser(data: LoginData) {
  return apiClient.login(data.email, data.password);
}

export async function resetPassword(email: string, newPassword: string) {
  return apiClient.resetPassword(email, newPassword);
}

export async function changePassword(
  email: string,
  currentPassword: string,
  newPassword: string
) {
  return apiClient.changePassword(email, currentPassword, newPassword);
}

export function logoutUser() {
  apiClient.logout();
}

export async function getCurrentUser() {
  return apiClient.getCurrentUser();
}

