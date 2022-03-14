import SafeUserData from "../entity-data/SafeUserData";
import BaseReponse from "./BaseResponse";

export type SignupResponseErrors = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  profileImgUrl?: string;
};

type SignupResponse = BaseReponse<SafeUserData, SignupResponseErrors>;

export default SignupResponse;
