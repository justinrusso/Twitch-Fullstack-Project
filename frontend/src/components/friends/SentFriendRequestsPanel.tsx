import UserId from "../../../../types/entity/ids/UserId";
import { useTemporaryNotifications } from "../../contexts/TemporaryNotificationsProvider";
import { useAppDispatch } from "../../hooks/redux";
import { selectUserRequestedFriendships } from "../../store/friends/selectors";
import { removeFriendship } from "../../store/friends/thunks";
import FriendsList from "./FriendsList";

type SentFriendRequestsPanelProps = {
  index: number;
  visible: boolean;
};

export default function SentFriendRequestsPanel({
  index,
  visible,
}: SentFriendRequestsPanelProps): JSX.Element {
  const dispatch = useAppDispatch();
  const temporaryNotifications = useTemporaryNotifications();

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
      id={`friends-tabpanel-${index}`}
      aria-labelledby={`friends-tab-${index}`}
    >
      {visible && (
        <>
          <FriendsList
            dispatchArgs={{
              status: "pending",
              direction: "sent",
            }}
            selector={selectUserRequestedFriendships}
            onDeclineRequest={handleDecline}
          />
        </>
      )}
    </div>
  );
}
