import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  SxProps,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";

import { useAppBar } from "../../contexts/AppBarProvider";

type AccountAppBarProps = { sx?: SxProps<Theme>; toggleMenu: () => void };

export default function AccountAppBar({ sx, toggleMenu }: AccountAppBarProps) {
  const { title } = useAppBar();

  return (
    <Box sx={sx}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
