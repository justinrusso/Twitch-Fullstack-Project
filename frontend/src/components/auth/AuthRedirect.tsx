import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../hooks/redux";
import { selectUser } from "../../store/user/selectors";

type AuthRedirectProps = {
  /**
   * If provided, overrides the default rendering of an `Outlet` component
   */
  children?: ReactNode;

  /**
   * The path to redirect to when a user is logged in
   */
  redirectLoggedInTo?: string;

  /**
   * The path to redirect to when a user is logged out
   */
  redirectLoggedOutTo?: string;
};

export default function AuthRedirect({
  children,
  redirectLoggedInTo,
  redirectLoggedOutTo,
}: AuthRedirectProps): JSX.Element {
  const user = useAppSelector(selectUser());

  if (user && redirectLoggedInTo) {
    return <Navigate to={redirectLoggedInTo} />;
  }
  if (!user && redirectLoggedOutTo) {
    return <Navigate to={redirectLoggedOutTo} />;
  }

  return children ? <>{children}</> : <Outlet />;
}
