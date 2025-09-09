"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tokenManager } from "@/utils/tokenManager";

export interface User {
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

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  tokenTimeRemaining: number; // minutos restantes
  logout: () => void;
  refreshUserData: () => Promise<void>;
  setAuthData: (user: User, token: string) => void; // Nueva función
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenTimeRemaining, setTokenTimeRemaining] = useState(0);
  const router = useRouter();

  // Función para actualizar el tiempo restante del token
  const updateTokenTimeRemaining = () => {
    const currentToken = tokenManager.getStoredToken();
    if (currentToken) {
      setTokenTimeRemaining(tokenManager.getTokenTimeRemaining(currentToken));
    } else {
      setTokenTimeRemaining(0);
    }
  };

  useEffect(() => {
    // Función para inicializar datos de autenticación
    const initializeAuth = async () => {
      const savedToken = tokenManager.getStoredToken();
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {
        try {
          // Verificar si el token es válido
          if (tokenManager.isTokenExpired(savedToken)) {
            // Token expirado, limpiar datos
            logout();
          } else {
            // Token válido, restaurar estado
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
            updateTokenTimeRemaining();
          }
        } catch (error) {
          console.error('Error loading auth data:', error);
          logout();
        }
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Escuchar eventos de token
  useEffect(() => {
    const handleTokenExpired = () => {
      console.log('Token expirado, cerrando sesión...');
      logout();
      router.push('/auth/login');
    };

    const handleTokenExpiringSoon = (event: CustomEvent) => {
      console.log(`Token expirará en ${event.detail.remainingMinutes} minutos`);
      updateTokenTimeRemaining();
      
      // Opcional: Mostrar notificación al usuario
      // showNotification(`Tu sesión expirará en ${event.detail.remainingMinutes} minutos`);
    };

    window.addEventListener('token-expired', handleTokenExpired);
    window.addEventListener('token-expiring-soon', handleTokenExpiringSoon as EventListener);

    // Actualizar tiempo restante cada minuto
    const timeInterval = setInterval(updateTokenTimeRemaining, 60000);

    return () => {
      window.removeEventListener('token-expired', handleTokenExpired);
      window.removeEventListener('token-expiring-soon', handleTokenExpiringSoon as EventListener);
      clearInterval(timeInterval);
    };
  }, [router]);

  // Función para refrescar datos del usuario
  const refreshUserData = async () => {
    const currentToken = await tokenManager.getValidToken();
    if (!currentToken) {
      logout();
      return;
    }

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";
      const response = await fetch(`${API_BASE}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.data);
          localStorage.setItem('user', JSON.stringify(data.data));
        }
      } else if (response.status === 401) {
        logout();
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  // Nueva función para establecer datos de autenticación
  const setAuthData = (userData: User, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    updateTokenTimeRemaining();
  };

  const logout = () => {
    tokenManager.clearTokens();
    setUser(null);
    setToken(null);
    setTokenTimeRemaining(0);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token && tokenManager.isStoredTokenValid(),
    isLoading,
    tokenTimeRemaining,
    logout,
    refreshUserData,
    setAuthData, // Agregar la nueva función
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}