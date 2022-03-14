import { Container, Toolbar, Typography } from "@mui/material";

import LoginForm from "../components/auth/LoginForm";
import UnauthedNav from "../components/nav/UnauthedNav";

export default function LoginPage(): JSX.Element {
  return (
    <>
      <UnauthedNav />
      <Toolbar />
      <Container
        maxWidth="sm"
        sx={{
          py: 4,
        }}
      >
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Log in to your account
        </Typography>
        <LoginForm />
      </Container>
    </>
  );
}
