import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Search and Sort Transactions", () => {
  it("filters transactions by description", async () => {
    const mockTransactions = [
      {
        id: 1,
        date: "2026-10-15",
        description: "Coffee",
        category: "Food",
        amount: 5,
      },
      {
        id: 2,
        date: "2026-10-16",
        description: "Rent",
        category: "Housing",
        amount: 900,
      },
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockTransactions,
    });

    render(<AccountContainer />);

    expect(await screen.findByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("Rent")).toBeInTheDocument();

    fireEvent.change(
      screen.getByPlaceholderText("Search your Recent Transactions"),
      { target: { value: "coffee" } },
    );

    expect(screen.getByText("Coffee")).toBeInTheDocument();
    expect(screen.queryByText("Rent")).not.toBeInTheDocument();
  });

  it("sorts transactions alphabetically by category", async () => {
  const mockTransactions = [
    {
      id: 1,
      date: "2026-10-15",
      description: "Rent",
      category: "Housing",
      amount: 900
    },
    {
      id: 2,
      date: "2026-10-16",
      description: "Coffee",
      category: "Food",
      amount: 5
    }
  ];

  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    json: async () => mockTransactions
  });

  const { container } = render(<AccountContainer />);

  await screen.findByText("Coffee");

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "category" }
  });

  const rows = container.querySelectorAll("tbody tr");

  expect(rows[1]).toHaveTextContent("Coffee");
  expect(rows[2]).toHaveTextContent("Rent");
});
});
