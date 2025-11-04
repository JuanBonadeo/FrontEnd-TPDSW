/* @vitest-environment jsdom */
import React from "react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { createRoot, Root } from "react-dom/client";
import { flushSync } from "react-dom";

// Mock para evitar navegación real en jsdom
Object.defineProperty(window, 'location', {
  value: {
    ...window.location,
    assign: vi.fn(),
    replace: vi.fn(),
    href: 'http://localhost:3000'
  },
  writable: true
});

vi.mock("next/link", () => ({
  default: ({ children, href, onClick, ...props }: { 
    children: React.ReactNode; 
    href: string; 
    onClick?: (e: React.MouseEvent) => void;
    [key: string]: unknown;
  }) => (
    <a 
      href={href} 
      onClick={(e) => {
        e.preventDefault(); // Prevenir navegación real
        if (onClick) onClick(e);
      }}
      {...props}
    >
      {children}
    </a>
  ),
}));

// Provide small mocks for Next hooks and our useApi hook
vi.mock("next/navigation", () => ({
  useSearchParams: () => ({ toString: () => "" }),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
}));

const mockCategories = [
  { id_category: 1, name: "Accion" },
  { id_category: 2, name: "Drama" },
];

vi.mock("@/hooks/useApi", () => ({
  useApi: (url: string) => {
    if (url?.toString().includes("/categories")) {
      return { data: mockCategories, loading: false, error: null };
    }
    return { data: null, loading: false, error: null };
  },
}));

import { CategoriesModal } from "./CategoriesModal";

describe("CategoriesModal", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    if (root && container) {
      flushSync(() => {
        root!.unmount();
      });
      container.remove();
    }
    container = null;
    root = null;
    vi.clearAllMocks();
  });

  it("opens the modal when the button is clicked", async () => {
    flushSync(() => {
      root!.render(<CategoriesModal />);
    });

    // Espera microtask para efectos
    await new Promise(resolve => setTimeout(resolve, 0));

    const button = container!.querySelector("button");
    expect(button).toBeTruthy();
    expect(button!.textContent).toMatch(/Categorias/i);

    // Click para abrir el modal
    button!.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    // Espera a que se actualice el DOM
    await new Promise(resolve => setTimeout(resolve, 10));

    // Modal header debería estar presente cuando está abierto
    const header = Array.from(container!.querySelectorAll("h2")).find(
      (h) => /Selecciona una categoría/i.test(h.textContent || "")
    );
    expect(header).toBeTruthy();
  });

  it("fills the button label when a category is chosen (simulate navigation)", async () => {
    // Render sin currentCategoryId
    flushSync(() => {
      root!.render(<CategoriesModal />);
    });

    await new Promise(resolve => setTimeout(resolve, 0));

    const openBtn = container!.querySelector("button");
    expect(openBtn).toBeTruthy();

    // Abrir modal
    openBtn!.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    await new Promise(resolve => setTimeout(resolve, 10));

    // Click en el link de categoría 'Drama'
    const catLink = Array.from(container!.querySelectorAll("a")).find(
      (a) => /Drama/i.test(a.textContent || "")
    );
    expect(catLink).toBeTruthy();

    // Click en la categoría (prevenir navegación real)
    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    catLink!.dispatchEvent(clickEvent);

    // Simular navegación del padre re-renderizando con la categoría elegida
    await new Promise(resolve => setTimeout(resolve, 10));
    
    flushSync(() => {
      root!.render(<CategoriesModal currentCategoryId={"2"} />);
    });

    await new Promise(resolve => setTimeout(resolve, 10));

    // Ahora el botón debería mostrar el nombre de la categoría seleccionada
    const btnAfter = container!.querySelector("button");
    expect(btnAfter).toBeTruthy();
    expect(btnAfter!.textContent).toMatch(/Categorias: Drama/i);
  });
});