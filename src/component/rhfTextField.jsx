import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function RHFtextfield({
  control,
  name,
  label,
  type, 
  ...other
}) {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          margin="normal"
          label={label}
          variant="outlined"
          error={error}
          helperText={error?.message}
          type={type}
          onChange={(e) => field.onChange(e.target.value)}
          {...other}
        />
      )}
    />
  );
}
