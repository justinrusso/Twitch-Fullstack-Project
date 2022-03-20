import FriendData from "../entity/data/FriendData";
import BaseReponse from "./BaseResponse";

export type FriendsResponseErrors = {
  direction?: string;
  userId?: string;
  friendId?: string;
};

type FriendsResponse = BaseReponse<FriendData[], FriendsResponseErrors>;

export default FriendsResponse;
