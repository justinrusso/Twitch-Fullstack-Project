import PublicUserData from "../entity/data/PublicUserData";
import BaseReponse from "./BaseResponse";

export type UsersResponseErrors = {
  key?: string;
};

type UsersResponse = BaseReponse<PublicUserData[], UsersResponseErrors>;

export default UsersResponse;
