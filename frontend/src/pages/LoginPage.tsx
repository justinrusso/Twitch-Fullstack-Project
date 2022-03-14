import { Container, Toolbar, Typography } from "@mui/material";

import LoginForm from "../components/auth/LoginForm";
import UnauthedNav from "../components/nav/UnauthedNav";

export default function HomePage(): JSX.Element {
  return (
    <>
      <UnauthedNav />
      <Toolbar />
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" textAlign="center" gutterBottom>
          Log in to your account
        </Typography>
        <LoginForm />
      </Container>
    </>
  );
}
