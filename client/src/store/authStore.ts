import { create } from "zustand";

interface AuthState {
  token: string | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  register: async (name, email, password) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${"/api/users/register"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    set({ token: data.accesToken });
  },

  login: async (email, password) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${"/api/users/login"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    set({ token: data.accesToken });
  },

  logout: () => {
    set({ token: null });
  },
}));
