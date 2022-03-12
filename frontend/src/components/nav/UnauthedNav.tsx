import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  Stack,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const menuBreakpoint: keyof Theme["breakpoints"]["values"] = "sm";

export default function UnauthedNav(): JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
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
                  [menuBreakpoint]: "none",
                },
              }}
              onClick={() => setDrawerOpen((prev) => !prev)}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                flexGrow: 1,
                textAlign: {
                  xs: "center",
                  [menuBreakpoint]: "left",
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
                  [menuBreakpoint]: "block",
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
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <Stack spacing={2} sx={{ padding: 3 }}>
            <Button variant="outlined" component={RouterLink} to="/login">
              Log in
            </Button>
            <Button variant="contained" component={RouterLink} to="/signup">
              Sign Up
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
