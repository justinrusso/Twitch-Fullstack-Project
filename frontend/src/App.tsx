import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import RedirectAuth from "./components/auth/RedirectAuth";
import { useAppDispatch } from "./hooks/redux";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { restoreUserSession } from "./store/user/thunks";
import RootThemeProvider from "./theme/RootThemeProvider";

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUserSession()).finally(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <RootThemeProvider>
      {isLoaded ? (
        <Routes>
          <Route path="/" element={<RedirectAuth />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
        </Routes>
      ) : (
        <></>
      )}
    </RootThemeProvider>
  );
}
