type BinaryStringInsertionSearchOptions<T> = {
  /**
   * Inverses the logic for arrays in descending order
   */
  descending?: boolean;

  /**
   * **Required for non-string type arrays.**
   * Used to obtain the string within each object to compare against.
   */
  getter?: (obj: T) => string;
};

/**
 * Finds the index to insert the `str` at
 * @param array The array to search
 * @param newValue The string or objectto see where to insert
 * @param options
 */
function binaryStringInsertionSearch<T extends string | Record<any, any>>(
  array: T[],
  newValue: T,
  options: BinaryStringInsertionSearchOptions<T>
) {
  if (typeof newValue !== "string" && !options.getter) {
    throw new Error("getter option must be set for non-string types");
  }

  const { descending } = options;
  const getter = options.getter ?? ((str: T) => str as string);
  const valueString = getter(newValue);

  let left = 0;
  let right = array.length - 1;

  // Used to flip the logic for arrays sorted in descending order
  function compareStrings(a: string, b: string): number {
    if (descending) {
      return b.localeCompare(a);
    }
    return a.localeCompare(b);
  }

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (compareStrings(getter(array[mid]), valueString) < 0) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

/**
 * Inserts a string or object into a sorted list in place.
 * Utilizes localeCompare & binary search to find the insertion spot.
 * @param array The array to insert into
 * @param newValue The string or object to insert
 * @param options
 */
export function addStringToSorted<T extends string | Record<any, any>>(
  array: T[],
  newValue: T,
  options: BinaryStringInsertionSearchOptions<T>
) {
  const pos = binaryStringInsertionSearch(array, newValue, options);
  array.splice(pos, 0, newValue);
  return array;
}
