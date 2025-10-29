/* @vitest-environment jsdom */
import React from "react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot, Root } from "react-dom/client";

// We'll mock the hooks used by the component. The mocks read variables
// defined below so tests can configure behavior per-case.
let authValue = false;
let isFavouriteValue = false;
let mockExecute: ReturnType<typeof vi.fn> = vi.fn();

vi.mock("@/context/AuthContext", () => ({
	useAuthContext: () => ({ isAuthenticated: authValue }),
}));

vi.mock("@/hooks/useApi", () => ({
	useApi: (url: string) => {
		if (url?.toString().includes("/favourites/isFavourite")) {
			return { data: { isFavourite: isFavouriteValue }, error: null, loading: false, execute: vi.fn() };
		}
		if (url?.toString().includes("/favourites/toggle")) {
			return { execute: mockExecute };
		}
		return {};
	},
}));



import { FavouriteButton } from "./FavouriteButton";

describe("FavouriteButton ", () => {
	let container: HTMLDivElement | null = null;
	let root: Root | null = null;

	beforeEach(() => {
		// reset defaults and spies before each test
		authValue = false;
		isFavouriteValue = false;
		// clear previous mocks first, then create the per-test mock so it's not cleared
		vi.clearAllMocks();
		// make the toggle execute an explicit async mock so we can assert it was called
		mockExecute = vi.fn().mockResolvedValue(undefined);

		container = document.createElement("div");
		document.body.appendChild(container);
		root = createRoot(container);
	});

	afterEach(() => {
		if (root && container) {
			act(() => root!.unmount());
			container.remove();
		}
		container = null;
		root = null;
	});

		it("renders login button when user is not authenticated", async () => {
		authValue = false;

		act(() => {
			root!.render(<FavouriteButton idMovie={1} />);
		});

		// wait for effects to run
		await Promise.resolve();

			// Find a button which contains the label
			const button = container!.querySelector("button#add-favourite");
			expect(button).toBeTruthy();
			expect(button!.textContent).toMatch(/A Favoritos|Cargando…/i);
	});

	it("shows favourite state when authenticated and toggles on click", async () => {
		authValue = true;
		isFavouriteValue = false; // start as favourite

		act(() => {
			root!.render(<FavouriteButton idMovie={1} />);
		});

		// wait for useEffect to set state
		await Promise.resolve();

		const button = container!.querySelector("button");
		expect(button).toBeTruthy();

		// After click local state flips, check text and svg
		expect(button!.textContent).toMatch(/A Favoritos/i);

		// Click the button to toggle (wrap in act)
		act(() => {
			// ensure button is not disabled
			expect((button as HTMLButtonElement).disabled).toBeFalsy();
			button!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
		});

		// wait a microtask so any promise-based execute() can resolve
		await Promise.resolve();

		// execute should have been called for the toggle API
		expect(mockExecute).toHaveBeenCalled();
	});

});
