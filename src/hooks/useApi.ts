"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, notFound } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface UseApiOptions<T> {
  enabled?: boolean;
  handleNotFound?: boolean;
  handleUnauthorized?: boolean;
  requireAuth?: boolean;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  onError?: (message: string, code?: string) => void;
  manual?: boolean; // Nueva opción para control manual
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  errorCode: string | null;
  execute: () => Promise<void>;
  reset: () => void; // Nueva función para resetear estado
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
    method = "GET",
    body,
    onError,
    manual = false, // Por defecto no es manual
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const router = useRouter();
  const cancelledRef = useRef(false);

  const getAuthToken = (): string | null => localStorage.getItem("token");

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setErrorCode(null);
    setLoading(false);
  }, []);

  const doFetch = useCallback(async () => {
    if (!endpoint) {
      setLoading(false);
      return;
    }

    // Auth requerido sin token
    if (requireAuth && !getAuthToken()) {
      setError("Token de autenticación requerido");
      setErrorCode("NO_TOKEN");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setErrorCode(null);

    try {
      const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;

      const headers: Record<string, string> = { Accept: "application/json" };

      const token = getAuthToken();
      if (requireAuth && token) headers["Authorization"] = `Bearer ${token}`;
      if (method !== "GET") headers["Content-Type"] = "application/json";

      const res = await fetch(url, {
        method,
        headers,
        body: method !== "GET" && body ? JSON.stringify(body) : undefined,
      });

      if (cancelledRef.current) return;

      const json = await res.json();

      if (!res.ok || !json.success) {
        const code = json.code || `HTTP_${res.status}`;
        const message = json.message || json.error || `Error ${res.status}`;

        setError(message);
        setErrorCode(code);
        onError?.(message, code);

        if (code === "NOT_FOUND" && handleNotFound) {
          setTimeout(() => notFound(), 10);
          return;
        }
        if (code === "UNAUTHORIZED" && handleUnauthorized) {
          setTimeout(() => router.push("/auth/login"), 10);
          return;
        }
        return;
      }

      setData(json.data);
    } catch (err: unknown) {
      if (cancelledRef.current) return;
      const errorMessage = err instanceof Error ? err.message : "Error de red";
      setError(errorMessage);
      setErrorCode("FETCH_ERROR");
      onError?.(errorMessage, "FETCH_ERROR");
    } finally {
      if (!cancelledRef.current) setLoading(false);
    }
  }, [
    endpoint,
    requireAuth,
    method,
    body,
    handleNotFound,
    handleUnauthorized,
    onError,
    router,
  ]);

  // Auto-fetch para GET no manuales
  useEffect(() => {
    cancelledRef.current = false;

    if (!endpoint || !enabled || manual) {
      setLoading(false);
      return;
    }

    if (method === "GET") {
      void doFetch();
    } else {
      setLoading(false);
    }

    return () => {
      cancelledRef.current = true;
    };
  }, [endpoint, enabled, method, manual, doFetch]);

  return {
    data,
    loading,
    error,
    errorCode,
    execute: doFetch,
    reset,
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
  execute: () => Promise<void>;
  reset: () => void;
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

  const { data, loading, error, errorCode, execute, reset } = useApi<T>(paginatedEndpoint, options);

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

  const resetPaginated = useCallback(() => {
    reset();
    setTotalPages(0);
  }, [reset]);

  return {
    data,
    loading,
    error,
    errorCode,
    totalPages,
    currentPage: page,
    pageSize,
    execute,
    reset: resetPaginated,
  };
}