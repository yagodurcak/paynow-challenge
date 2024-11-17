import { useState, useEffect } from "react";
import { fetchTransactions } from "@/pages/api/mockData";
import { Transaction } from "../types/types";


export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<string>("");
  const [nextId, setNextId] = useState(1); // ID inicial

  useEffect(() => {
    fetchTransactions().then((data) => {
      setTransactions(data);
      setFilteredTransactions(data);
      setNextId(data.length + 1);
      setIsLoading(false);
    });
  }, []);

  const filterByDate = (startDate: string, endDate: string) => {
    const filtered = transactions.filter(
      (transaction) =>
        transaction.date >= startDate && transaction.date <= endDate
    );
    setFilteredTransactions(filtered);
  };

  const checkTargetAmount = (targetAmount: number) => {
    let found = false;
    for (let i = 0; i < transactions.length; i++) {
      for (let j = i + 1; j < transactions.length; j++) {
        if (transactions[i].amount + transactions[j].amount === targetAmount) {
          setResult(
            `Transacciones que coinciden: ${transactions[i].id} y ${transactions[j].id}`
          );
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!found) {
      setResult("No matching transactions found.");
    }
  };

  const addTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const nextId = Math.max(...transactions.map((t) => t.id)) + 1;
    const transactionWithId: Transaction = { ...newTransaction, id: nextId };
    
    if (transactions.some((t) => t.id === transactionWithId.id)) {
      throw new Error(`ID duplicado: ${transactionWithId.id}`);
    }
  
    setTransactions((prev) => [...prev, transactionWithId]);
    setFilteredTransactions((prev) => [...prev, transactionWithId]);
  };
  

  return {
    transactions,
    filteredTransactions,
    isLoading,
    result,
    filterByDate,
    checkTargetAmount,
    addTransaction,
  };
};
