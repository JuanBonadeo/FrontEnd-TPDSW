"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { ApiResponse } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface UseApiOptions<T> {
  enabled?: boolean;
  dependencies?: any[];
  cache?: RequestCache;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: any; // si es JSON, lo serializas abajo
  keepPreviousData?: boolean; // evita flicker si true
  select?: (data: T) => any;  // transforma data antes de setearla
  onSuccess?: (data: T) => void;
  onError?: (message: string) => void;
  raw?: boolean; // si la API no viene envuelta en {success,data}
}

export function useApi<T>(
  endpoint: string | null,
  {
    enabled = true,
    dependencies = [],
    cache = "no-store",
    method = "GET",
    headers,
    body,
    keepPreviousData = false,
    select,
    onSuccess,
    onError,
    raw = false,
  }: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // evita setState tras unmount
  const mounted = useRef(true);

  const fetchData = useCallback(
    async (signal?: AbortSignal) => {
      if (!endpoint || !enabled) {
        if (!keepPreviousData) setData(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        if (!keepPreviousData) setData(null);

        const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;

        const isJsonBody =
          body && typeof body === "object" && !(body instanceof FormData);
        const mergedHeaders: Record<string, string> = {
          Accept: "application/json",
          ...(headers ?? {}),
          ...(isJsonBody ? { "Content-Type": "application/json" } : {}),
        };

        const res = await fetch(url, {
          method,
          headers: mergedHeaders,
          cache,
          body: isJsonBody ? JSON.stringify(body) : body,
          signal,
        });

        const text = await res.text();
        if (!res.ok) {
          const msg = `Error ${res.status}: ${text.slice(0, 300)}`;
          if (mounted.current) {
            setError(msg);
            onError?.(msg);
          }
          return;
        }

        // intenta parsear JSON
        let parsed: any;
        try {
          parsed = text ? JSON.parse(text) : null;
        } catch {
          const msg = "Respuesta inválida de la API (no es JSON)";
          if (mounted.current) {
            setError(msg);
            onError?.(msg);
          }
          return;
        }

        // Soporta tu formato {success, data, message} o raw
        let payload: any;
        if (raw) {
          payload = parsed;
        } else {
          const json = parsed as ApiResponse<T>;
          if (!json?.success) {
            const msg = json?.message || "Error en API";
            if (mounted.current) {
              setError(msg);
              onError?.(msg);
            }
            return;
          }
          payload = json.data;
        }

        // select opcional
        const finalData = select ? select(payload as T) : payload;

        if (mounted.current) {
          setData(finalData as T);
          onSuccess?.(finalData as T);
        }
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        const msg = e?.message ?? "Error desconocido";
        if (mounted.current) {
          setError(msg);
          onError?.(msg);
        }
      } finally {
        if (mounted.current) setLoading(false);
      }
    },
    [
      endpoint,
      enabled,
      cache,
      method,
      headers,
      body,
      keepPreviousData,
      select,
      onSuccess,
      onError,
      raw,
    ]
  );

  useEffect(() => {
    mounted.current = true;
    const ac = new AbortController();
    fetchData(ac.signal);
    return () => {
      mounted.current = false;
      ac.abort();
    };
  }, [fetchData, ...dependencies]);

  return { data: data as T | null, loading, error, refetch: fetchData };
}

// Paginado
export function useApiPaginated<T extends { pagination?: any }>(
  endpoint: string | null,
  page = 1,
  pageSize = 30,
  options: UseApiOptions<T> = {}
) {
  const [totalPages, setTotalPages] = useState(0);

  const paginatedEndpoint = endpoint
    ? `${endpoint}${endpoint.includes("?") ? "&" : "?"}page=${page}&limit=${pageSize}`
    : null;

  const { data, loading, error, refetch } = useApi<T>(paginatedEndpoint, {
    ...options,
    keepPreviousData: options.keepPreviousData ?? true, // útil para evitar flicker
    dependencies: [page, pageSize, ...(options.dependencies || [])],
  });

  useEffect(() => {
    if (!loading && !error && data) {
      const anyData = data as any;
      const tp = anyData?.pagination?.totalPages ?? anyData?.totalPages ?? 0;
      setTotalPages(tp);
    }
  }, [data, loading, error]);

  return { data, loading, error, totalPages, refetch };
}
