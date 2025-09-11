"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { tokenManager } from "@/utils/tokenManager";
import { useAuthContext } from "@/context/AuthContext"; // Importar el contexto

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
  register: (data: RegisterData) => Promise<boolean>;
  login: (data: LoginData) => Promise<boolean>;
  logout: () => void;
}

export function useAuth(): UseAuthResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { logout: contextLogout, setAuthData } = useAuthContext(); // Usar funciones del contexto

  const saveAuthData = useCallback((authData: AuthResponse) => {
    // Guardar en localStorage (como antes)
    tokenManager.storeToken(authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
    
    // CLAVE: Actualizar el contexto inmediatamente
    setAuthData(authData.user, authData.token);
    
    // Opcional: Mostrar info del token
    const tokenInfo = tokenManager.getTokenInfo(authData.token);
    if (tokenInfo) {
      console.log(`Sesión iniciada. Expira en: ${tokenManager.getTokenTimeRemaining(authData.token)} minutos`);
    }
  }, [setAuthData]);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    setLoading(true);
    setError(null);

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
        return false;
      }

      saveAuthData(json.data);
      router.push("/");
      return true;
    } catch (err) {
      setError(err.message || "Error de red");
      return false;
    } finally {
      setLoading(false);
    }
  }, [router, saveAuthData]);

  const login = useCallback(async (data: LoginData): Promise<boolean> => {
    setLoading(true);
    setError(null);

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
        return false;
      }

      saveAuthData(json.data);
      router.push("/");
      return true;
    } catch (err) {
      setError(err.message || "Error de red");
      return false;
    } finally {
      setLoading(false);
    }
  }, [router, saveAuthData]);

  const logout = useCallback(() => {
    contextLogout(); // Usar la función del contexto
    router.push("/");
  }, [router, contextLogout]);

  return {
    loading,
    error,
    register,
    login,
    logout,
  };
}