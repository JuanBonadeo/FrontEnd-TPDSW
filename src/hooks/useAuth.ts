"use client";

import { useState, useCallback } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

interface User {
  id: string;
  name: string;
  email: string;
  birth_date: string;
  role: string;
  isActive: boolean;
  emailVerified: boolean;
  image: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  birth_date: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UseAuthResult {
  loading: boolean;
  error: string | null;
  redirectPath: string | null; // nuevo estado
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}

export function useAuth(): UseAuthResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  const saveAuthData = (authData: AuthResponse) => {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
  };

  const register = useCallback(async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    setRedirectPath(null);

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        const errorMessage = json.message || json.error || `Error ${response.status}`;
        setError(errorMessage);
        return;
      }

      saveAuthData(json.data);

      // En vez de redirigir, guardamos el path sugerido
      setRedirectPath("/");
    } catch (err: any) {
      setError(err.message || "Error de red");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (data: LoginData) => {
    setLoading(true);
    setError(null);
    setRedirectPath(null);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        const errorMessage = json.message || json.error || `Error ${response.status}`;
        setError(errorMessage);
        return;
      }

      saveAuthData(json.data);

      // En vez de redirigir, guardamos el path sugerido
      setRedirectPath("/");
    } catch (err: any) {
      setError(err.message || "Error de red");
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setRedirectPath("auth/login"); // logout -> ir al login
  }, []);

  return {
    loading,
    error,
    redirectPath,
    register,
    login,
    logout,
  };
}
