import { selectAcceptedFriendships } from "../../store/friends/selectors";
import FriendsList from "./FriendsList";

type FriendsPanelProps = {
  index: number;
  visible: boolean;
};

export default function FriendsPanel({
  index,
  visible,
}: FriendsPanelProps): JSX.Element {
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
        />
      )}
    </div>
  );
}
