import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RootThemeProvider from "./theme/RootThemeProvider";

export default function App(): JSX.Element {
  return (
    <RootThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </RootThemeProvider>
  );
}
