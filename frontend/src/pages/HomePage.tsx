import socialPayment from "../images/social-payment.svg";

import {
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import UnauthedNav from "../components/nav/UnauthedNav";

export default function HomePage(): JSX.Element {
  return (
    <>
      <UnauthedNav />
      <Box>
        <Toolbar />
        <Container sx={{ py: 10 }}>
          <Grid
            container
            sx={{ px: { md: 8 }, textAlign: { xs: "center", md: "left" } }}
          >
            <Grid item md={5} sx={{ pb: { xs: 8, md: 0 } }}>
              <Typography variant="h2" component="h1" sx={{ pb: 6 }}>
                Simple and secure social payments
              </Typography>
              <Button variant="contained" component={RouterLink} to="/signup">
                Sign Up
              </Button>
            </Grid>
            <Grid item md={7} sx={{ width: "100%" }}>
              <img
                src={socialPayment}
                width="100%"
                height="auto"
                alt="social payments"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
