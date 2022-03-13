import SafeUserData from "../entity-data/SafeUserData";
import BaseReponse from "./BaseResponse";

type LoginResponse = BaseReponse<
  SafeUserData,
  {
    credentials: string;
  }
>;

export default LoginResponse;
