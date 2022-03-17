type UsersQueryRequest = {
  /**
   * A string to use for searching users.
   * At least one character must be sent.
   * Searches the username and the first + ' ' + last name
   */
  key: string;
};

export default UsersQueryRequest;
