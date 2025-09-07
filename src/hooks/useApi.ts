"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useRouter, notFound } from "next/navigation";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface UseApiOptions<T> {
  enabled?: boolean;
  handleNotFound?: boolean;
  handleUnauthorized?: boolean;
  requireAuth?: boolean;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  onError?: (message: string, code?: string) => void;
  manual?: boolean;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  errorCode: string | null;
  execute: () => Promise<void>;
  reset: () => void;
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
    manual = false,
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
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  } | null;
  loading: boolean;
  error: string | null;
  errorCode: string | null;
  currentPage: number;
  execute: () => Promise<void>;
  reset: () => void;
}

export function useApiPaginated<T>(
  endpoint: string | null,
  page = 1,
  pageSize = 30,
  options: UseApiOptions<T> = {}
): UseApiPaginatedResult<T> {
  const {
    enabled = true,
    handleNotFound = true,
    handleUnauthorized = true,
    requireAuth = false,
    method = "GET",
    body,
    onError,
    manual = false,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const router = useRouter();
  const cancelledRef = useRef(false);

  const getAuthToken = (): string | null => localStorage.getItem("token");

  const reset = useCallback(() => {
    setData(null);
    setPagination(null);
    setError(null);
    setErrorCode(null);
    setLoading(false);
  }, []);

  // Construcción del endpoint con parámetros de paginación
  const paginatedEndpoint = useMemo(() => {
    if (!endpoint) return null;
    
    const separator = endpoint.includes('?') ? '&' : '?';
    return `${endpoint}${separator}page=${page}&limit=${pageSize}`;
  }, [endpoint, page, pageSize]);

  const doFetch = useCallback(async () => {
    if (!paginatedEndpoint) {
      setLoading(false);
      return;
    }

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
      const url = paginatedEndpoint.startsWith("http") ? paginatedEndpoint : `${API_BASE}${paginatedEndpoint}`;

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

      // Extraer data y pagination de la respuesta
      setData(json.data);
      setPagination(json.pagination);
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
    paginatedEndpoint,
    requireAuth,
    method,
    body,
    handleNotFound,
    handleUnauthorized,
    onError,
    router,
  ]);

  useEffect(() => {
    cancelledRef.current = false;

    if (!paginatedEndpoint || !enabled || manual) {
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
  }, [paginatedEndpoint, enabled, method, manual, doFetch]);

  return {
    data,
    pagination,
    loading,
    error,
    errorCode,
    currentPage: page,
    execute: doFetch,
    reset,
  };
}