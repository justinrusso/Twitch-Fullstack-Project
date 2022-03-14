import SafeUserData from "../entity/data/SafeUserData";
import UserId from "../entity/ids/UserId";
import BaseReponse from "./BaseResponse";

type LogoutResponse = BaseReponse<{ id: UserId }, any>;

export default LogoutResponse;
