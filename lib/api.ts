// lib/api.ts (Mock API functions for signup flow)
export async function signupUser(data: {
  fullName: string;
  email: string;
  password: string;
}) {
  // Mock: Simulate API call
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true }), 1000)
  );
}

export async function verifyCode(email: string, code: string) {
  // Mock: Success if code is '123456'
  return new Promise((resolve, reject) =>
    setTimeout(
      () =>
        code === "123456"
          ? resolve({ success: true })
          : reject({ error: "Invalid code" }),
      1000
    )
  );
}

export async function generateLearningPath(data: {
  career: string;
  level: string;
  jobDesc: string;
  link: string;
}) {
  // Mock analyzing
  return new Promise((resolve) =>
    setTimeout(() => resolve({ path: "Generated path" }), 2000)
  );
}
