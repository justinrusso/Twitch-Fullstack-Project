import SafeUserData from "../entity/data/SafeUserData";
import BaseReponse from "./BaseResponse";

export type LoginResponseErrors = {
  credentials: string;
};

type LoginResponse = BaseReponse<SafeUserData, LoginResponseErrors>;

export default LoginResponse;
