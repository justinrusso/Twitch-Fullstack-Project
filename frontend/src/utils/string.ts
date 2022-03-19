import PublicUserData from "../../../types/entity/data/PublicUserData";

/**
 * Capitalizes the first letter of the string
 * @param str the string to capitalize
 * @returns the capitalized string
 */
export function capitalize(str: string) {
  return str[0].toLocaleUpperCase() + str.substring(1);
}

/**
 * A utility function to format the user's full name given a user object
 * @param user The user to format their full name
 */
export function getUsersFullName(user: PublicUserData) {
  return `${user.firstName} ${user.lastName}`;
}
