/* @vitest-environment jsdom */
import React from "react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot, Root } from "react-dom/client";

// Provide small mocks for Next hooks and our useApi hook
vi.mock("next/navigation", () => ({
  useSearchParams: () => ({ toString: () => "" }),
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
      act(() => root.unmount());
      container.remove();
    }
    container = null;
    root = null;
    vi.clearAllMocks();
  });

  it("opens the modal when the button is clicked", async () => {
    act(() => {
      root!.render(<CategoriesModal />);
    });

    // wait for initial effects
    await Promise.resolve();

    const button = container!.querySelector("button");
    expect(button).toBeTruthy();
    expect(button!.textContent).toMatch(/Categorias/i);

    // click the button to open the modal
    act(() => {
      button!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // wait for update
    await Promise.resolve();

    // Modal header should be present when open
    const header = Array.from(container!.querySelectorAll("h2")).find((h) => /Selecciona una categoría/i.test(h.textContent || ""));
    expect(header).toBeTruthy();
  });

  it("fills the button label when a category is chosen (simulate navigation)", async () => {
    // render without a currentCategoryId
    act(() => {
      root!.render(<CategoriesModal />);
    });

    await Promise.resolve();

    const openBtn = container!.querySelector("button");
    expect(openBtn).toBeTruthy();

    // open modal
    act(() => {
      openBtn!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await Promise.resolve();

    // click the category link 'Drama'
    const catLink = Array.from(container!.querySelectorAll("a")).find((a) => /Drama/i.test(a.textContent || ""));
    expect(catLink).toBeTruthy();

    act(() => {
      catLink!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // simulate parent navigation by re-rendering component with the chosen category id
    await Promise.resolve();
    act(() => {
      root!.render(<CategoriesModal currentCategoryId={"2"} />);
    });

    await Promise.resolve();

    // Now the button should show the selected category name
    const btnAfter = container!.querySelector("button");
    expect(btnAfter).toBeTruthy();
    expect(btnAfter!.textContent).toMatch(/Categorias: Drama/i);
  });
});
