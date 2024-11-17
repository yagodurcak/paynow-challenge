import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import React, { useState } from "react";

type TargetAmountFilterProps = {
  onCheck: (targetAmount: number) => void;
  result: string;
};

const TargetAmountFilter: React.FC<TargetAmountFilterProps> = ({
  onCheck,
  result,
}) => {
  const [targetAmount, setTargetAmount] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleCheck = () => {
    if (targetAmount === null || targetAmount <= 0) {
      setError("Por favor, ingresa un monto objetivo válido.");
      return;
    }
    setError("");
    onCheck(targetAmount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    setTargetAmount(value);
    setError(""); 
  };

  return (
    <div className="flex flex-col">
    <Box className="flex gap-4" aria-label="Filtro de Monto Objetivo">
      <TextField
        label="Monto objetivo"
        type="number"
        value={targetAmount ?? ""}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        error={!!error}
        helperText={error}
        aria-label="Ingresar monto objetivo"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheck}
        aria-label="Verificar monto objetivo"
      >
        Verificar
      </Button>
    </Box>
  
      {result && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="info">
                    {result}
          </Alert>
      )}
    </div>
  );
};

export default TargetAmountFilter;
