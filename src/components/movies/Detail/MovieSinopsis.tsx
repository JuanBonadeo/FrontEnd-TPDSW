import { useState, useRef, useEffect } from "react";


// Componente para truncar y expandir la sinopsis
export function Sinopsis({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const NUM_LINES = 2;

  useEffect(() => {
    if (ref.current) {
      const lineHeight = parseFloat(getComputedStyle(ref.current).lineHeight);
      const maxHeight = lineHeight * NUM_LINES;
      setShowButton(ref.current.scrollHeight > maxHeight);
    }
  }, [description]);

  return (
    <>
      <p
        ref={ref}
        className={
          'text-sm text-muted-foreground transition-all ' +
          (expanded ? '' : `line-clamp-${NUM_LINES}`)
        }
        style={{ WebkitLineClamp: expanded ? undefined : NUM_LINES }}
      >
        {description}
      </p>
      {showButton && (
        <button
          className="mt-2 text-xs text-blue-500 underline"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Ver menos' : 'Ver más'}
        </button>
      )}
    </>
  );
}