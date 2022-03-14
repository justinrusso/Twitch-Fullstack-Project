import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Theme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { logoutUser } from "../../store/user/thunks";

type AccountSidebarProps = {
  closeDrawer: () => void;
  drawerBreakpoint: keyof Theme["breakpoints"]["values"];
  showDrawer: boolean;
  width: number;
};

export default function AccountSidebar({
  closeDrawer,
  drawerBreakpoint,
  showDrawer,
  width,
}: AccountSidebarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => navigate("/"));
  };

  const drawerContents = (
    <>
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: width }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={showDrawer}
        onClose={closeDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", [drawerBreakpoint]: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width,
          },
        }}
      >
        {drawerContents}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", [drawerBreakpoint]: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width,
          },
        }}
        open
      >
        {drawerContents}
      </Drawer>
    </Box>
  );
}
