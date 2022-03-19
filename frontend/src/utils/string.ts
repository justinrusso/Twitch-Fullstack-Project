/**
 * Capitalizes the first letter of the string
 * @param str the string to capitalize
 * @returns the capitalized string
 */
export function capitalize(str: string) {
  return str[0].toLocaleUpperCase() + str.substring(1);
}
