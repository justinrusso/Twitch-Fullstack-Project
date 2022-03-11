import {
  useMediaQuery,
  createTheme,
  CssBaseline,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material";
import { ReactElement, useMemo } from "react";

type RootThemeProviderProps = {
  children: ReactElement;
};

export default function RootThemeProvider({
  children,
}: RootThemeProviderProps): JSX.Element {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: prefersDarkMode ? "dark" : "light",
          },
        })
      ),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
