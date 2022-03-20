type FriendsQueryRequest = {
  /**
   * Searches for friends based on the status provided.
   * If omitted, friendships regardless of status are returned.
   */
  status?: "accepted" | "pending";

  /**
   * **Required if status is pending.**
   * Used to determine which pending friendships to return.
   */
  direction?: "received" | "sent";
};

export default FriendsQueryRequest;
