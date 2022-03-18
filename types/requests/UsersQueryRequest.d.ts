type UsersQueryRequest = {
  /**
   * A string to use for searching users.
   * At least one character must be sent.
   * Searches the username and the first + ' ' + last name
   */
  key: string;

  /**
   * Allows omitting the currently logged in user from the query results
   */
  ignoreSelf?: boolean;
};

export default UsersQueryRequest;
