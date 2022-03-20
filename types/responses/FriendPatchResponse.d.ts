import FriendData from "../entity/data/FriendData";
import BaseReponse from "./BaseResponse";

export type FriendPatchResponseErrors = {
  accepted?: string;
  id?: string;
};

type FriendPatchResponse = BaseReponse<FriendData, FriendPatchResponseErrors>;

export default FriendPatchResponse;
