import UserId from "../ids/UserId";

type SafeUserData = {
  readonly id: UserId;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly profileImgUrl?: string;
  readonly balance: number;
};

export default SafeUserData;
