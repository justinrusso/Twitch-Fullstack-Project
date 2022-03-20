import { Box, Container, Theme } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import AppBarProvider from "../../contexts/AppBarProvider";
import TemporaryNotificationsProvider from "../../contexts/TemporaryNotificationsProvider";
import { useAppDispatch } from "../../hooks/redux";
import { getUserData } from "../../store/user/thunks";
import AccountAppBar from "../nav/AccountAppBar";
import AccountSidebar from "../nav/AccountSidebar";

const drawerWidth = 320;
const drawerBreakpoint: keyof Theme["breakpoints"]["values"] = "md";

/**
 * A layout component wrapping all authenticated account routes
 */
export default function AccountLayout() {
  const dispatch = useAppDispatch();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Poll for new user data
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(getUserData());
    }, 60 * 1000);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  return (
    <TemporaryNotificationsProvider>
      <AppBarProvider defaultTitle="Account Home">
        <AccountAppBar
          toggleMenu={() => setMobileDrawerOpen((prev) => !prev)}
          sx={{
            display: { [drawerBreakpoint]: "none" },
          }}
        />
        <Box sx={{ display: "flex" }}>
          <AccountSidebar
            closeDrawer={() => setMobileDrawerOpen(false)}
            drawerBreakpoint={drawerBreakpoint}
            showDrawer={mobileDrawerOpen}
            width={drawerWidth}
          />
          <Container
            component="main"
            sx={{
              flexGrow: 1,
              py: 3,
              width: { [drawerBreakpoint]: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Outlet />
          </Container>
        </Box>
      </AppBarProvider>
    </TemporaryNotificationsProvider>
  );
}
