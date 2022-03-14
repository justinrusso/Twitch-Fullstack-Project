import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RootThemeProvider from "./theme/RootThemeProvider";

export default function App(): JSX.Element {
  return (
    <RootThemeProvider>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </RootThemeProvider>
  );
}
