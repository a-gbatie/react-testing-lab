import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Add Transactions", () => {
  it("sends a POST request and displays the new transaction", async () => {
    const newTransaction = {
      id: 2,
      date: "2026-10-15",
      description: "Groceries",
      category: "Food",
      amount: "45",
    };

    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => newTransaction,
      });

    const { container } = render(<AccountContainer />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    const form = container.querySelector("form");

    fireEvent.change(form.elements.date, {
      target: { value: "2026-10-15" },
    });

    fireEvent.change(form.elements.description, {
      target: { value: "Groceries" },
    });

    fireEvent.change(form.elements.category, {
      target: { value: "Food" },
    });

    fireEvent.change(form.elements.amount, {
      target: { value: "45" },
    });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "http://localhost:6001/transactions",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: "2026-10-15",
            description: "Groceries",
            category: "Food",
            amount: "45",
          }),
        }),
      );
    });

    expect(await screen.findByText("Groceries")).toBeInTheDocument();
  });
});
