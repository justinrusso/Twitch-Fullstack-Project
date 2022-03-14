import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectUser } from "../../store/user/selectors";
import { logoutUser } from "../../store/user/thunks";
import { currencyFormatter } from "../../utils/currency";
import UserAvatar from "../common/UserAvatar";

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

  const user = useAppSelector(selectUser());

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => navigate("/"));
  };

  const drawerContents = (
    <>
      <Box p={4}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <UserAvatar
            firstName={user?.firstName}
            lastName={user?.lastName}
            height={80}
            width={80}
          />
          <div>
            <Typography sx={{ fontWeight: 500 }} gutterBottom>
              Hi, {user?.firstName}
            </Typography>
            <Typography variant="body2">@{user?.username}</Typography>
          </div>
        </Stack>
        <Box pt={2}>
          <Typography>
            {currencyFormatter.format(user?.balance || 0)} in account
          </Typography>
        </Box>
      </Box>
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
      aria-label="account navigation"
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
