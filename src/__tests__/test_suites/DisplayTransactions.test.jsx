  import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";

describe("Display Transactions", () => {
  it("displays transactions when the app loads", async () => {
    const mockTransactions = [
      {
        id: 1,
        date: "2026-10-15",
        description: "Coffee",
        category: "Food",
        amount: 5
      }
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockTransactions
    });

    render(<AccountContainer />);

    expect(await screen.findByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();
  });
});