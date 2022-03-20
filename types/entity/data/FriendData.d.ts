import PublicUserData from "./PublicUserData";

type FriendData = {
  readonly friend: PublicUserData;
  readonly accepted: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export default FriendData;
