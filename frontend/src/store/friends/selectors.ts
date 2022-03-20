import { RootState } from "..";
import FriendData from "../../../../types/entity/data/FriendData";

export const selectAcceptedFriendships = () => (state: RootState) => {
  const friendships: FriendData[] = [];

  state.friends.order.forEach((id) => {
    const friendship = state.friends.entities[id];

    if (friendship && friendship.accepted) {
      friendships.push(friendship);
    }
  });

  return friendships;
};

/**
 * Selects the friendships that are pending
 */
export const selectUserRequestedFriendships = () => (state: RootState) => {
  const friendships: FriendData[] = [];

  state.friends.order.forEach((id) => {
    const friendship = state.friends.entities[id];

    if (friendship && !friendship.accepted) {
      friendships.push(friendship);
    }
  });

  return friendships;
};
