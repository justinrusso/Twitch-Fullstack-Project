import { selectUserRequestedFriendships } from "../../store/friends/selectors";
import FriendsList from "./FriendsList";

type SentFriendRequestsPanelProps = {
  index: number;
  visible: boolean;
};

export default function SentFriendRequestsPanel({
  index,
  visible,
}: SentFriendRequestsPanelProps): JSX.Element {
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
          />
        </>
      )}
    </div>
  );
}
