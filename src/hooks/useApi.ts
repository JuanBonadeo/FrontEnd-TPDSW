"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface UseApiOptions<T> {
  enabled?: boolean;
  handleNotFound?: boolean;
  handleUnauthorized?: boolean;
  requireAuth?: boolean; // Nueva opción para endpoints que requieren autenticación
  onError?: (message: string, code?: string) => void;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  errorCode: string | null;
}

export function useApi<T>(
  endpoint: string | null,
  options: UseApiOptions<T> = {}
): UseApiResult<T> {
  const {
    enabled = true,
    handleNotFound = true,
    handleUnauthorized = true,
    requireAuth = false,
    onError
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const router = useRouter();

  // Función para obtener el token del localStorage
  const getAuthToken = (): string | null => {
    
      const token = localStorage.getItem('token');
      return token;
    
  };

  useEffect(() => {
    if (!endpoint || !enabled) {
      setLoading(false);
      return;
    }

    // Si requiere autenticación pero no hay token, no hacer la petición
    if (requireAuth && !getAuthToken()) {
      setError("Token de autenticación requerido");
      setErrorCode("NO_TOKEN");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      if (cancelled) return;
      
      setLoading(true);
      setError(null);
      setErrorCode(null);

      try {
        const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;
        
        // Preparar headers
        const headers: Record<string, string> = {
          "Accept": "application/json"
        };

        // Agregar token si está disponible y se requiere autenticación
        const token = getAuthToken();
        if (requireAuth && token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        
        const res = await fetch(url, { headers });

        if (cancelled) return;

        const json = await res.json();

        // Error HTTP o API error
        if (!res.ok || !json.success) {
          const code = json.code || `HTTP_${res.status}`;
          const message = json.message || json.error || `Error ${res.status}`;

          setError(message);
          setErrorCode(code);
          onError?.(message, code);

          // Redirecciones simples
          if (code === "NOT_FOUND" && handleNotFound) {
            setTimeout(() => notFound(), 10);
            return;
          }
          if (code === "UNAUTHORIZED" && handleUnauthorized) {
            setTimeout(() => router.push("auth/login"), 10);
            return;
          }

          return;
        }

        // Success
        setData(json.data);

      } catch (err: unknown) {
        if (cancelled) return;

        let errorMessage = "Error de red";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        setErrorCode("FETCH_ERROR");
        onError?.(errorMessage, "FETCH_ERROR");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [endpoint, enabled, handleNotFound, handleUnauthorized, requireAuth, onError, router]);

  return {
    data,
    loading,
    error,
    errorCode,
  };
}

interface UseApiPaginatedResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  errorCode: string | null;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export function useApiPaginated<T>(
  endpoint: string | null,
  page = 1,
  pageSize = 30,
  options: UseApiOptions<T> = {}
): UseApiPaginatedResult<T> {
  const [totalPages, setTotalPages] = useState(0);

  const paginatedEndpoint = endpoint 
    ? `${endpoint}?page=${page}&limit=${pageSize}` 
    : null;

  const { data, loading, error, errorCode } = useApi<T>(paginatedEndpoint, options);

  useEffect(() => {
    if (data && !loading && !error) {
      type PaginatedResponse = {
        pagination?: { totalPages?: number };
        totalPages?: number;
        meta?: { totalPages?: number };
      };
      const response = data as PaginatedResponse;
      const tp = response?.pagination?.totalPages || 
                 response?.totalPages || 
                 response?.meta?.totalPages ||
                 0;
      setTotalPages(tp);
    } else {
      setTotalPages(0);
    }
  }, [data, loading, error]);

  return {
    data,
    loading,
    error,
    errorCode,
    totalPages,
    currentPage: page,
    pageSize,
  };
}