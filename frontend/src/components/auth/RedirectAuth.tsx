import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../hooks/redux";
import { selectUser } from "../../store/user/selectors";

export default function RedirectAuth(): JSX.Element | null {
  const user = useAppSelector(selectUser());

  if (user) {
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
}
