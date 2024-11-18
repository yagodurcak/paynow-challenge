import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { Transaction } from "../../../types/types";

type TransactionsTableProps = {
  transactions: Transaction[];
};

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount);
  };

  return (
    <TableContainer component={Paper} aria-label="Tabla de transacciones">
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "primary.main" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              <strong>ID</strong>
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              <strong>Nombre</strong>
            </TableCell>
            <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>
              <strong>Monto</strong>
            </TableCell>
            <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>
              <strong>Fecha</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions?.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.name}</TableCell>
                <TableCell align="right">
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell align="right">
                  {transaction.date}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="subtitle1" color="textSecondary">
                  No se encontraron transacciones.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
