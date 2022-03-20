import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import AuthRedirect from "./components/auth/AuthRedirect";
import AccountLayout from "./components/layouts/AccountLayout";
import { useAppDispatch } from "./hooks/redux";
import FriendsPage from "./pages/account/FriendsPage";
import NotificationsPage from "./pages/account/NotificationsPage";
import SearchPage from "./pages/account/SearchPage";
import NewTransactionPage from "./pages/account/TransactionPage";
import TransferPage from "./pages/account/TransferPage";
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
          <Route
            path="/"
            element={<AuthRedirect redirectLoggedInTo="/account" />}
          >
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
          <Route
            path="/account"
            element={
              <AuthRedirect redirectLoggedOutTo="/">
                <AccountLayout />
              </AuthRedirect>
            }
          >
            <Route index />
            <Route path="friends" element={<FriendsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="transactions/new" element={<NewTransactionPage />} />
            <Route path="transfer" element={<TransferPage />} />
          </Route>
        </Routes>
      ) : (
        <></>
      )}
    </RootThemeProvider>
  );
}
