import SafeUserData from "../entity-data/SafeUserData";
import BaseReponse from "./BaseResponse";

type LogoutResponse = BaseReponse<{ id: number }, none>;

export default LogoutResponse;
