/* @vitest-environment jsdom */
import React from "react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { createRoot, Root } from "react-dom/client";
import { flushSync } from "react-dom";

// Mocks
let authValue = false;
let isFavouriteValue = false;
let mockExecute: ReturnType<typeof vi.fn> = vi.fn();

vi.mock("@/context/AuthContext", () => ({
  useAuthContext: () => ({ isAuthenticated: authValue }),
}));

vi.mock("@/hooks/useApi", () => ({
  useApi: (url: string) => {
    if (url?.toString().includes("/favourites/isFavourite")) {
      return { 
        data: { isFavourite: isFavouriteValue }, 
        error: null, 
        loading: false, 
        execute: vi.fn() 
      };
    }
    if (url?.toString().includes("/favourites/toggle")) {
      return { execute: mockExecute };
    }
    return {};
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

import { FavouriteButton } from "./FavouriteButton";

describe("FavouriteButton", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    authValue = false;
    isFavouriteValue = false;
    vi.clearAllMocks();
    mockExecute = vi.fn().mockResolvedValue(undefined);

    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    if (root && container) {
      // flushSync es más directo que act para unmount
      flushSync(() => {
        root!.unmount();
      });
      container.remove();
    }
    container = null;
    root = null;
  });

  it("renders login button when user is not authenticated", async () => {
    authValue = false;

    // Render sincrónicamente
    flushSync(() => {
      root!.render(<FavouriteButton idMovie={1} />);
    });

    // Espera microtask para efectos
    await new Promise(resolve => setTimeout(resolve, 0));

    const button = container!.querySelector("button#add-favourite");
    expect(button).toBeTruthy();
    expect(button!.textContent).toMatch(/A Favoritos|Cargando…/i);
  });

  it("shows favourite state when authenticated and toggles on click", async () => {
    authValue = true;
    isFavouriteValue = false;

    flushSync(() => {
      root!.render(<FavouriteButton idMovie={1} />);
    });

    // Espera a que los efectos se ejecuten
    await new Promise(resolve => setTimeout(resolve, 10));

    const button = container!.querySelector("button");
    expect(button).toBeTruthy();
    expect(button!.textContent).toMatch(/A Favoritos/i);
    expect((button as HTMLButtonElement).disabled).toBeFalsy();

    // Click del botón
    button!.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    // Espera a que se resuelvan las promesas
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(mockExecute).toHaveBeenCalledTimes(1);
  });
});