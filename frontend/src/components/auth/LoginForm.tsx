import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginResponseErrors } from "../../../../types/responses/LoginResponse";

import useFormFields from "../../hooks/form-fields";
import { useAppDispatch } from "../../hooks/redux";
import { loginDemoUser, loginUser } from "../../store/user/thunks";

export default function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { fields, setField } = useFormFields({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginResponseErrors>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(loginUser(fields)).unwrap();
      navigate("/account");
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      setErrors(error as LoginResponseErrors);
    }
  };

  const handleDemoLogin = async () => {
    try {
      await dispatch(loginDemoUser()).unwrap();
      navigate("/account");
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      setErrors(error as LoginResponseErrors);
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      onSubmit={handleSubmit}
    >
      <TextField
        id="login-username"
        label="Username"
        required
        value={fields.username}
        onChange={(e) => setField("username", e.target.value)}
        error={!!errors.credentials}
      />
      <TextField
        id="login-password"
        label="Password"
        required
        type={showPassword ? "text" : "password"}
        value={fields.password}
        onChange={(e) => setField("password", e.target.value)}
        error={!!errors.credentials}
        helperText={errors.credentials ?? undefined}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained">
        Sign In
      </Button>
      <Typography>
        Looking to try out the website?{" "}
        <Link component="button" type="button" onClick={handleDemoLogin}>
          Log in as a demo user
        </Link>
      </Typography>
    </Box>
  );
}
