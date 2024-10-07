import React from "react";
import { TextField } from "@mui/material";

const InputField = ({ name, formik, label, ...props }) => {
  return (
    <TextField
      variant="standard"
      fullWidth
      label={label}
      {...props}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      autoComplete="off"
    />
  );
};

export default InputField;
