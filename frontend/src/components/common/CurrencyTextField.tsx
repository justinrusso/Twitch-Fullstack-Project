import { TextField, InputAdornment, TextFieldProps } from "@mui/material";

type CurrencyTextFieldProps = TextFieldProps;

export default function CurrencyTextField({
  ...textFieldProps
}: CurrencyTextFieldProps): JSX.Element {
  return (
    <TextField
      {...textFieldProps}
      sx={{ width: "fit-content", ...textFieldProps.sx }}
      type="number"
      inputProps={{
        inputMode: "numeric",
        pattern: "[\\d.]",
        min: 0,
        step: 0.01,
        ...textFieldProps.inputProps,
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
        ...textFieldProps.InputProps,
      }}
    />
  );
}
