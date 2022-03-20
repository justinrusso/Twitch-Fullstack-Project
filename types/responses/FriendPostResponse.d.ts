import FriendData from "../entity/data/FriendData";
import BaseReponse from "./BaseResponse";

export type FriendPostResponseErrors = {
  id?: string;
};

type FriendPostResponse = BaseReponse<FriendData, FriendPostResponseErrors>;

export default FriendPostResponse;
