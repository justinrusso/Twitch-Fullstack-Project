import { useEffect } from "react";

import { useAppBar } from "../../contexts/AppBarProvider";

export default function FriendsPage(): JSX.Element {
  const { setTitle } = useAppBar();

  useEffect(() => {
    setTitle("Friends");
  }, [setTitle]);

  return <></>;
}
