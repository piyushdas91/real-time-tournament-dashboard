// components/SeasonSelect.tsx

import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface SeasonSelectProps {
  label?: string;
  value: string;
  setValue: any;
  setCompetitionCode: any;
  options: string[];
  onChange: any;
  width?: number | string;
  size?: "small" | "medium";
}

const Dropdown: React.FC<SeasonSelectProps> = ({
  label,
  value,
  setValue,
  setCompetitionCode,
  options,
  onChange,
  width = 100,
  size = "small",
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    // console.log(event.target.value);
    
    setValue(event.target.value);
  };

  return (
    <div className="py-4">
        <FormControl
      variant="outlined"
      size={size}
      sx={{
        minWidth: width,
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
    >
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={`${label}-select`}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {label} {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </div>
    
  );
};

export default Dropdown;
