import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import UnauthedNav from "../components/nav/UnauthedNav";

export default function HomePage(): JSX.Element {
  return (
    <>
      <UnauthedNav />
      <Box>
        <Toolbar />
        <Container sx={{ pt: 6, textAlign: "center" }}>
          <Typography variant="h1" textAlign="center" gutterBottom>
            Simple and secure social payments
          </Typography>
          <Button variant="contained" component={RouterLink} to="/signup">
            Sign Up
          </Button>
        </Container>
      </Box>
    </>
  );
}
