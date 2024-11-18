import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import React, { useState } from "react";

type DateFilterProps = {
  onFilter: (startDate: string, endDate: string) => void;
};

const DateFilter: React.FC<DateFilterProps> = ({ onFilter }) => {
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDates((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateDates = (): boolean => {
    const { startDate, endDate } = dates;

    if (!startDate || !endDate) {
      setError("Por favor, selecciona ambas fechas.");
      return false;
    }

    if (startDate > endDate) {
      setError("La fecha de inicio debe ser anterior a la fecha de fin.");
      return false;
    }

    return true;
  };

  const handleFilter = () => {
    if (validateDates()) {
      onFilter(dates.startDate, dates.endDate);
    }
  };

  return (
    <div className="flex flex-col">
      <Box className="flex gap-4">
        <TextField
          label="Fecha inicio"
          name="startDate"
          type="date"
          value={dates.startDate}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          error={!!error && !dates.startDate}
          helperText={error && !dates.startDate ? error : ""}
          aria-label="Selecciona la fecha de inicio"
        />
        <TextField
          label="Fecha fin"
          name="endDate"
          type="date"
          value={dates.endDate}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          error={!!error && !dates.endDate}
          helperText={error && !dates.endDate ? error : ""}
          aria-label="Selecciona la fecha de fin"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          aria-label="Filtro de fechas"
          className="p-6 h-[56px]"
        >
          Filtrar
        </Button>
      </Box>
      {error && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default DateFilter;
