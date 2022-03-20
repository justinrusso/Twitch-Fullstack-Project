import UserId from "../../../../types/entity/ids/UserId";
import { useTemporaryNotifications } from "../../contexts/TemporaryNotificationsProvider";
import { useAppDispatch } from "../../hooks/redux";
import { selectAcceptedFriendships } from "../../store/friends/selectors";
import { removeFriendship } from "../../store/friends/thunks";
import FriendsList from "./FriendsList";

type FriendsPanelProps = {
  index: number;
  visible: boolean;
};

export default function FriendsPanel({
  index,
  visible,
}: FriendsPanelProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { enqueueNotification } = useTemporaryNotifications();

  const handleRemove = async (id: UserId) => {
    try {
      await dispatch(removeFriendship(id)).unwrap();
    } catch {
      enqueueNotification({
        message: "Failed to remove friend.",
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
        <FriendsList
          dispatchArgs={{
            status: "accepted",
          }}
          selector={selectAcceptedFriendships}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
}
