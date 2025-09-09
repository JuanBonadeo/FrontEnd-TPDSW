"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Hand, X } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link.js";

type ReviewResponse = {
  id_review: number;
  id_movie: number;
  rating: number;
  title?: string | null;
  content: string;
  created_at: string;
};

interface ReviewModalProps {
  idMovie: string;
}

export default function ReviewModal({ idMovie }: ReviewModalProps) {
  const { isAuthenticated } = useAuthContext();
  if (!isAuthenticated) return (
      <Link href="/auth/login" className="flex items-center justify-center bg-blue-600 rounded-md py-2 w-xl hover:bg-blue-700 transition-colors cursor-pointer">
        <Hand className={"w-4 h-4 mr-2"} />
        Reseñar
      </Link>
  );
  const [open, setOpen] = useState(false);

  // Form state
  const [score, setScore] = useState<number>(5);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // Para pasar el body al hook y que execute use lo último
  const body = useMemo(
    () => ({
      id_movie: idMovie,
      score,
      comment: content.trim(),
    }),
    [idMovie, score, content]
  );

  const {
    data: created,
    loading,
    error,
    errorCode,
    execute,
  } = useApi<ReviewResponse>("/reviews", {
    method: "POST",
    requireAuth: true,
    body,
  });

  // Cerrar cuando se crea con éxito
  useEffect(() => {
    if (created && open) {
      setOpen(false);
      // Reset del form (opcional)
      setScore(5);
      setTitle("");
      setContent("");
    }
  }, [created, open]);

  // Bloquear scroll del body al abrir
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Click fuera para cerrar (focus trap simple)
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) setOpen(false);
  };

  // Validación sencilla
  const canSubmit =
    !loading &&
    score >= 1 &&
    score <= 5 &&
    content.trim().length >= 10 && // mínimo 10 chars
    content.trim().length <= 2000; // máximo 2000 chars

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    await execute?.(); // dispara el POST
  };

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center bg-blue-600 rounded-md py-2 w-xl hover:bg-blue-700 transition-colors cursor-pointer"
        title="Escribir una reseña"
      >
        <Hand className="w-4 h-4 mr-2" />
        Reseñar
      </button>

      {/* Modal */}
      {open && (
        <div
          ref={backdropRef}
          onClick={onBackdropClick}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          aria-modal="true"
          role="dialog"
        >
          <div className="w-full bg max-w-lg rounded-2xl bg-background text-foreground shadow-2xl border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-semibold">Nueva reseña</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-2 hover:bg-white/5"
                aria-label="Cerrar"
                title="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {/* Rating */}
                <div>
                  <label className="block text-sm mb-1">Rating (1–5)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      max={5}
                      step={.1}
                      value={score}
                      onChange={(e) => setScore(Number(e.target.value))}
                      className="w-24 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={.1}
                      value={score}
                      onChange={(e) => setScore(Number(e.target.value))}
                      className="w-full text-red"
                    />
                  </div>
                </div>

                

                {/* Contenido */}
                <div>
                  <label className="block text-sm mb-1">Contenido</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    placeholder="Escribí tu reseña (mínimo 10 caracteres)…"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary resize-y"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {Math.max(0, 10 - content.trim().length)} caracteres para el mínimo.
                  </p>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                  {error} {errorCode ? `(${errorCode})` : ""}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-4 py-2 text-sm hover:bg-white/5"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Guardando…" : "Publicar reseña"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
