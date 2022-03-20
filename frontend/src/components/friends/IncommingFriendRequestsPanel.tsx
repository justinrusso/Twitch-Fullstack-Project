import UserId from "../../../../types/entity/ids/UserId";
import { useTemporaryNotifications } from "../../contexts/TemporaryNotificationsProvider";
import { useAppDispatch } from "../../hooks/redux";
import { selectUserRequestedFriendships } from "../../store/friends/selectors";
import { acceptFriendship, removeFriendship } from "../../store/friends/thunks";
import FriendsList from "./FriendsList";

type IncommingFriendRequestsPanelProps = {
  index: number;
  visible: boolean;
};

/**
 * A notification panel for incomming friend requests
 */
export default function IncommingFriendRequestsPanel({
  index,
  visible,
}: IncommingFriendRequestsPanelProps): JSX.Element {
  const dispatch = useAppDispatch();
  const temporaryNotifications = useTemporaryNotifications();

  const handleAccept = async (id: UserId) => {
    try {
      await dispatch(acceptFriendship(id)).unwrap();
      temporaryNotifications.enqueueNotification({
        message: "Friend request accepted!",
        severity: "success",
      });
    } catch (error) {
      temporaryNotifications.enqueueNotification({
        message: "Failed to decline friendship request.",
        severity: "error",
      });
    }
  };

  const handleDecline = async (id: UserId) => {
    try {
      await dispatch(removeFriendship(id)).unwrap();
    } catch (error) {
      temporaryNotifications.enqueueNotification({
        message: "Failed to decline friendship request.",
        severity: "error",
      });
    }
  };

  return (
    <div
      role="tabpanel"
      hidden={!visible}
      id={`notification-tabpanel-${index}`}
      aria-labelledby={`notification-tab-${index}`}
    >
      {visible && (
        <FriendsList
          dispatchArgs={{
            status: "pending",
            direction: "received",
          }}
          selector={selectUserRequestedFriendships}
          onAcceptRequest={handleAccept}
          onDeclineRequest={handleDecline}
        />
      )}
    </div>
  );
}
