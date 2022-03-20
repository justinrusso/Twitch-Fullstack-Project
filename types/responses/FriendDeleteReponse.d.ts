import UserId from "../entity/ids/UserId";
import BaseReponse from "./BaseResponse";

export type FriendDeleteResponseErrors = {
  id?: string;
};

type FriendDeleteResponse = BaseReponse<
  { id: UserId },
  FriendDeleteResponseErrors
>;

export default FriendDeleteResponse;
