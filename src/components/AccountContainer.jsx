import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]); //store transactions fetched from the API
  const [search, setSearch] = useState(""); //store the user's search input
  const [sortBy, setSortBy] = useState("description"); //store which field the transaction should be sorted by

  //Fetch transactions fron JSON Server when the compnent first mounts
  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  //Sends a new transaction to backend using a POST request
  function postTransaction(newTransaction) {
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => setTransactions([...transactions, data]));
  }

  // Sort function when user selects a dropdown option
  function onSort(sortBy) {
    setSortBy(sortBy);
  }

  //Filter transactions based on user's search input
  //Convert both strings to lowercase for case-sensitive 
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(search.toLowerCase()),
  );

  //Create a copy of filter array and sort alphabetically
  const sortedTransactions = [...filteredTransactions].sort((a, b) =>
    a[sortBy].localeCompare(b[sortBy]),
  );

  return (
    <div>
      <Search setSearch={setSearch} />
      <AddTransactionForm postTransaction={postTransaction} />
      <Sort onSort={onSort} />
      <TransactionsList transactions={sortedTransactions} />
    </div>
  );
}

export default AccountContainer;
