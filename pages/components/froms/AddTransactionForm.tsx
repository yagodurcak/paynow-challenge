import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

type AddTransactionFormProps = {
  onAdd: (newTransaction: { name: string; amount: number; date: string }) => void;
};

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
  });
  const [errors, setErrors] = useState<{
    name: string;
    amount: string;
    date: string;
  }>({
    name: "",
    amount: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Limpiar errores al cambiar
  };

  const validateForm = (): boolean => {
    const newErrors = { name: "", amount: "", date: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
      isValid = false;
    }

    const parsedAmount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = "El monto debe ser un número mayor a 0.";
      isValid = false;
    }

    if (!formData.date.trim()) {
      newErrors.date = "La fecha es obligatoria.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setFormData({ name: "", amount: "", date: "" });
    setErrors({ name: "", amount: "", date: "" });
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newTransaction = {
      name: formData.name,
      amount: parseFloat(formData.amount),
      date: formData.date,
    };

    onAdd(newTransaction);
    resetForm();
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        error={!!errors.name}
        helperText={errors.name}
        aria-label="Nombre de la transacción"
      />
      <TextField
        label="Monto"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        fullWidth
        error={!!errors.amount}
        helperText={errors.amount}
        aria-label="Monto de la transacción"
      />
      <TextField
        label="Fecha"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        error={!!errors.date}
        helperText={errors.date}
        aria-label="Fecha de la transacción"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        aria-label="Agregar transacción"
      >
        Agregar Transacción
      </Button>
    </Box>
  );
};

export default AddTransactionForm;
