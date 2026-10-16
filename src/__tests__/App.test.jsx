import "./test_suites/AddTransactions.test";
import "./test_suites/DisplayTransactions.test";
import "./test_suites/SearchSort.test";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../components/App";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("App", () => {
  it("renders the bank heading", () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    render(<App />);

    expect(screen.getByText("The Royal Bank of Flatiron")).toBeInTheDocument();
  });
});
