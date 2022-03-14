import { Container, Toolbar, Typography } from "@mui/material";

import SignupForm from "../components/auth/SignupForm";
import UnauthedNav from "../components/nav/UnauthedNav";

export default function SignupPage(): JSX.Element {
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
          Create an account
        </Typography>
        <SignupForm />
      </Container>
    </>
  );
}
