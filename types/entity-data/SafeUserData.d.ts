type SafeUserData = {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly profileImgUrl?: string;
  readonly balance: number;
};

export default SafeUserData;
