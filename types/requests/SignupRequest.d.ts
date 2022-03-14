type SignupRequest = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  profileImgUrl?: string;
};

export default SignupRequest;
