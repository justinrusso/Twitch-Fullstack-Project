import { Button, Divider, List } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

import FriendData from "../../../../types/entity/data/FriendData";
import UserId from "../../../../types/entity/ids/UserId";
import FriendsQueryRequest from "../../../../types/requests/FriendsQueryRequest";
import { useTemporaryNotifications } from "../../contexts/TemporaryNotificationsProvider";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store";
import { getFriends } from "../../store/friends/thunks";
import LoadingCircle from "../common/LoadingCircle";
import UserListItem from "../user/UserListItem";

type FriendsListProps = {
  dispatchArgs: FriendsQueryRequest;
  /**
   * Controls if the Accept Request button is displayed and gets called when it is clicked.
   */
  onAcceptRequest?: (id: UserId) => void;
  /**
   * Controls if the Cancel Request button is displayed and gets called when it is clicked.
   */
  onCancel?: (id: UserId) => void;
  /**
   * Controls if the Decline Request button is displayed and gets called when it is clicked.
   */
  onDeclineRequest?: (id: UserId) => void;
  /**
   * Controls if the Remove Friend button is displayed and gets called when it is clicked.
   */
  onRemove?: (id: UserId) => void;
  selector: () => (state: RootState) => FriendData[];
};

export default function FriendsList({
  dispatchArgs,
  onAcceptRequest,
  onCancel,
  onDeclineRequest,
  onRemove,
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
          <UserListItem
            user={friendship.friend}
            actions={
              <>
                {onCancel && (
                  <Button
                    color="error"
                    onClick={() => onCancel(friendship.friend.id)}
                  >
                    Cancel Request
                  </Button>
                )}
                {onDeclineRequest && (
                  <Button
                    color="error"
                    onClick={() => onDeclineRequest(friendship.friend.id)}
                  >
                    Decline
                  </Button>
                )}
                {onRemove && (
                  <Button
                    color="error"
                    onClick={() => onRemove(friendship.friend.id)}
                  >
                    Remove Friend
                  </Button>
                )}
                {onAcceptRequest && (
                  <Button onClick={() => onAcceptRequest(friendship.friend.id)}>
                    Accept
                  </Button>
                )}
              </>
            }
          />
          {i !== friendships.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </Fragment>
      ))}
    </List>
  );
}
