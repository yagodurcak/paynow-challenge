import { Box, Button, CircularProgress } from "@mui/material";
import AddTransactionForm from "./components/froms/AddTransactionForm";
import DateFilter from "./components/filters/DateFilter";
import Header from "./components/layout/Header";
import TargetAmountFilter from "./components/filters/TargetAmountFilter";
import TransactionsTable from "./components/tables/TransactionsTable";
import {useTransactions} from "../hooks/useTransactions";
import { Transaction } from "../types/types";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const {
    filteredTransactions,
    isLoading,
    result,
    filterByDate,
    checkTargetAmount,
    addTransaction,
  } = useTransactions();

  const handleAddTransaction = (
    newTransaction: Omit<Transaction, "id">
  ): void => {
    addTransaction(newTransaction);
  };

  return (
    <div className="bg-white m-0 w-full h-screen relative">
      <Header />
      <main className="flex flex-col gap-8 w-full font-semibold p-5">
        <div className="flex w-full">
          <h1 className="text-2xl text-black">Transactions</h1>
          <div className="w-full flex justify-end">
            <Button
              variant="contained"
              color="primary"
              aria-label="Filtro de fechas"
              onClick={() => setOpen(true)}
            >
              Add Transaction
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="text-gray-600">Filtrar por fecha</div>
            <DateFilter onFilter={filterByDate} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="text-gray-600">Filtrar por Monto</div>
            <TargetAmountFilter onCheck={checkTargetAmount} result={result} />
          </div>
        </div>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <AddTransactionForm onAdd={handleAddTransaction} />
          </Box>
        </Modal>

        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <TransactionsTable transactions={filteredTransactions} />
        )}
      </main>
    </div>
  );
}
