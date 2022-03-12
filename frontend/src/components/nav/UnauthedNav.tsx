import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function UnauthedNav(): JSX.Element {
  return (
    <AppBar color="inherit">
      <Container>
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            sx={{
              display: {
                xs: "inline-flex",
                sm: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              textAlign: {
                xs: "center",
                sm: "left",
              },
            }}
          >
            <Link
              component={RouterLink}
              to="/"
              sx={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Typography component="span">App Name</Typography>
            </Link>
          </Box>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            <Button variant="text" component={RouterLink} to="/login">
              Log in
            </Button>
            <Button variant="contained" component={RouterLink} to="/signup">
              Sign Up
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
