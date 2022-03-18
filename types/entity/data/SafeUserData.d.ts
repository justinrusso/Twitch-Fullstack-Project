import PublicUserData from "./PublicUserData";

type SafeUserData = PublicUserData & {
  readonly balance: number;
};

export default SafeUserData;
