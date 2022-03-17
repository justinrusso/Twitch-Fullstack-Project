import UserId from "../ids/UserId";

type PublicUserData = {
  readonly id: UserId;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly profileImgUrl?: string;
};

export default PublicUserData;
