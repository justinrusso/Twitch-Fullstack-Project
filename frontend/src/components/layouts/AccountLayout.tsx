import { Box, Container, Theme } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import AccountSidebar from "../nav/AccountSidebar";

const drawerWidth = 320;
const drawerBreakpoint: keyof Theme["breakpoints"]["values"] = "md";

export default function AccountLayout() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <AccountSidebar
        closeDrawer={() => setMobileDrawerOpen((prev) => !prev)}
        drawerBreakpoint={drawerBreakpoint}
        showDrawer={mobileDrawerOpen}
        width={drawerWidth}
      />
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { [drawerBreakpoint]: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}