import UserId from "../entity/ids/UserId";

type FriendPostRequest = {
  /**
   * The ID of the user to send the request to
   */
  id: UserId;
};

export default FriendPostRequest;
