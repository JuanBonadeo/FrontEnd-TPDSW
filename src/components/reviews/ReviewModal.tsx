"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Hand, X, Star, Send } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { createReview } from "@/actions/reviewActions";
import Link from "next/link.js";



interface ReviewModalProps {
  idMovie: string;
}

export default function ReviewModal({ idMovie }: ReviewModalProps) {
  const { isAuthenticated, token } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState<number>(5);
  const [scoreInput, setScoreInput] = useState<string>(String(5));
  const [content, setContent] = useState<string>("");
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  const body = useMemo(
    () => ({
      id_movie: idMovie,
      score,
      comment: content.trim(),
    }),
    [idMovie, score, content]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (created && open) {
      setOpen(false);
      setScore(5);
      setContent("");
    }
  }, [created, open]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const backdropRef = useRef<HTMLDivElement | null>(null);
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) setOpen(false);
  };

  const canSubmit =
    !loading &&
    score >= 1 &&
    score <= 5 &&
    content.trim().length >= 10 &&
    content.trim().length <= 2000;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      await createReview({ id_movie: idMovie, score, comment: content.trim(), token });
      setCreated(true);
      // Server Action performs revalidation server-side; no client revalidate needed here
      // Notify any client listeners (e.g. review lists) so they can refresh immediately
      if (typeof window !== 'undefined') {
        try {
          window.dispatchEvent(new CustomEvent('review-created', { detail: { idMovie } }));
        } catch (e) {
          // ignore
        }
      }
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = (rating: number) => {
    setScore(rating);
    // keep the input in sync (show integer when clicking stars)
    setScoreInput(String(rating));
  };

  const handleScoreInputChange = (value: string) => {
    // accept comma as decimal separator
    setScoreInput(value);
    const normalized = value.replace(/,/g, ".");
    const parsed = parseFloat(normalized);
    if (!Number.isNaN(parsed)) {
      // clamp between 1 and 5
      const clamped = Math.max(1, Math.min(5, parsed));
      setScore(clamped);
    }
  };

  const handleScoreInputBlur = () => {
    // normalize on blur: format with comma and clamp
    const normalized = score.toString().replace(/\./g, ",");
    setScoreInput(normalized);
  };

  const getRatingText = (rating: number) => {
    if (rating <= 1) return "Muy mala";
    if (rating <= 2) return "Mala";
    if (rating <= 3) return "Regular";
    if (rating <= 4) return "Buena";
    return "Excelente";
  };

  const getRatingColor = (rating: number) => {
    if (rating <= 1) return "text-red-400";
    if (rating <= 2) return "text-orange-400";
    if (rating <= 3) return "text-yellow-400";
    if (rating <= 4) return "text-blue-400";
    return "text-green-400";
  };

  if (!isAuthenticated) return (
    <Link href="/auth/login" className={"flex items-center justify-center group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800  py-2 px-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-95"}>
      <Hand className={"w-4 h-4 md:w-5 md:h-5 mr-2  group-hover:rotate-360 transition-transform duration-600"} />
      <span className="text-xs">Reseña</span>
      <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
    </Link>
  );
  return (
    <>
      {/* Trigger Button - Mejorado */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center  group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-95"
      >
          <Hand className="w-4 h-4 md:w-5 md:h-5 mr-2  group-hover:rotate-360 transition-transform duration-600" />
          <span className="text-xs">Reseña</span>
        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
      </button>

      {/* Modal - Completamente rediseñado */}
      {open && (
        <div
          ref={backdropRef}
          onClick={onBackdropClick}
          className="fixed inset-0 z-50 bg-black/60  flex items-center justify-center px-4"
          aria-modal="true"
          role="dialog"
        >
          <div className="w-full max-w-md bg2 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 ">
            {/* Header con gradiente */}
            <div className="relative bg-gradient-to-r  rounded-t-md p-3 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Nueva reseña
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">Comparte tu opinión</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 hover:bg-white/10 transition-colors group"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-3">
              {/* Rating con estrellas interactivas */}
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-white">
                  ¿Cómo calificarías esta película?
                </label>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="group transition-transform hover:scale-125 focus:scale-125 active:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 transition-all duration-200 ${star <= (hoveredStar || score)
                            ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                            : "text-gray-600 hover:text-gray-400"
                          }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className={`font-bold text-lg ${getRatingColor(score)}`}>
                    {scoreInput.replace(".", ",")}/5
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className={`font-medium ${getRatingColor(score)}`}> 
                    {getRatingText(score)}
                  </span>
                </div>
              </div>

              {/* Input para permitir coma como separador decimal */}
              <div className="mt-2">
                <label className="text-sm text-gray-400 mr-2">Puntaje:</label>
                <input
                  aria-label="Puntaje"
                  value={scoreInput}
                  onChange={(e) => handleScoreInputChange(e.target.value)}
                  onBlur={handleScoreInputBlur}
                  className="w-20 inline-block text-center bg border border-gray-700 rounded px-2 py-1 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  placeholder="5"
                />
                <span className="ml-2 text-xs text-gray-400">(usa coma para decimales, ej. 3,5)</span>
              </div>

              {/* Textarea */}
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-white">
                  Cuéntanos qué te pareció
                </label>

                <div className="relative">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    placeholder="Comparte tu opinión, qué te gustó, qué mejorarías..."
                    className="w-full bg border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all resize-none"
                  />

                  {/* Contador de caracteres */}
                  <div className="absolute bottom-3 right-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${content.trim().length >= 10
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-700/50 text-gray-500'
                      }`}>
                      {content.trim().length}/2000
                    </span>
                  </div>
                </div>

                {content.trim().length < 10 && (
                  <p className="text-orange-400 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                    Necesitas al menos {10 - content.trim().length} caracteres más
                  </p>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Botones */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  disabled={!canSubmit}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${canSubmit
                      ? "bg-gradient-to-r bg-red-600  hover:bg-red-800 transform hover:scale-102 active:scale-95"
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Publicando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Publicar reseña
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}