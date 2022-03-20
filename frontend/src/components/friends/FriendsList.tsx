import { Divider, List } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

import FriendData from "../../../../types/entity/data/FriendData";
import FriendsQueryRequest from "../../../../types/requests/FriendsQueryRequest";
import { useTemporaryNotifications } from "../../contexts/TemporaryNotificationsProvider";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store";
import { getFriends } from "../../store/friends/thunks";
import LoadingCircle from "../common/LoadingCircle";
import FriendListItem from "./FriendListItem";

type FriendsListProps = {
  dispatchArgs: FriendsQueryRequest;
  selector: () => (state: RootState) => FriendData[];
};

export default function FriendsList({
  dispatchArgs,
  selector,
}: FriendsListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const temporaryNotifications = useTemporaryNotifications();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getFriends(dispatchArgs))
      .unwrap()
      .then(() => setLoading(false))
      .catch(() =>
        temporaryNotifications.enqueueNotification({
          message: "An unexpected error occured.",
          severity: "error",
        })
      );
  }, [dispatch, dispatchArgs, temporaryNotifications]);

  const friendships = useAppSelector(selector());

  if (loading) {
    return <LoadingCircle />;
  }

  return (
    <List>
      {friendships.map((friendship, i) => (
        <Fragment key={friendship.friend.id}>
          <FriendListItem friend={friendship.friend} />
          {i !== friendships.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </Fragment>
      ))}
    </List>
  );
}
