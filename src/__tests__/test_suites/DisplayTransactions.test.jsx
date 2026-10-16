import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";

describe("Display Transactions", () => {
  it("displays transactions when the app loads", async () => {
    
    //mock data for test
    const mockTransactions = [
      {
        id: 1,
        date: "2026-10-15",
        description: "Coffee",
        category: "Food",
        amount: 5,
      },
    ];

    //Use .spyOn to return fake response so the test can run without JSON Server
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockTransactions,
    });

    //Virtual DOM for testing
    render(<AccountContainer />);

    //Wait for fetched transaction && verify the category is also displayed
    expect(await screen.findByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();
  });
});
