import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import SignupRequest from "../../../../types/requests/SignupRequest";
import { SignupResponseErrors } from "../../../../types/responses/SignupResponse";
import useFormFields from "../../hooks/form-fields";
import { useAppDispatch } from "../../hooks/redux";
import { signupUser } from "../../store/user/thunks";

export default function SignupForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { fields, setField, getChangedFields } = useFormFields({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<SignupResponseErrors>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setErrors({});

    if (fields.password !== fields.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      await dispatch(signupUser(getChangedFields() as SignupRequest)).unwrap();
      navigate("/account");
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      setErrors(error as SignupResponseErrors);
    }
  };

  return (
    <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
      <Grid item xs={6}>
        <TextField
          id="signup-firstname"
          label="First Name"
          fullWidth
          required
          value={fields.firstName}
          onChange={(e) => setField("firstName", e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName ?? undefined}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="signup-lastname"
          label="Last Name"
          fullWidth
          required
          value={fields.lastName}
          onChange={(e) => setField("lastName", e.target.value)}
          error={!!errors.lastName}
          helperText={errors.lastName ?? undefined}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="signup-username"
          label="Username"
          fullWidth
          required
          value={fields.username}
          onChange={(e) => setField("username", e.target.value)}
          error={!!errors.username}
          helperText={errors.username ?? "Use 6 or more characters"}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="signup-password"
          label="Password"
          fullWidth
          required
          type={showPassword ? "text" : "password"}
          value={fields.password}
          onChange={(e) => setField("password", e.target.value)}
          error={!!errors.password}
          helperText={errors.password ?? "Use 6 or more characters"}
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
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="signup-confirmpassword"
          label="Confirm Password"
          fullWidth
          required
          type={showConfirmPassword ? "text" : "password"}
          value={fields.confirmPassword}
          onChange={(e) => setField("confirmPassword", e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword ?? undefined}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" fullWidth>
          Create Account
        </Button>
      </Grid>
    </Grid>
  );
}
