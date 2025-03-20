/*
Implement a function flatten that returns a newly-created array with all sub-array elements concatenated recursively into a single level.

Examples
// Single-level arrays are unaffected.
flatten([1, 2, 3]); // [1, 2, 3]

// Inner arrays are flattened into a single level.
flatten([1, [2, 3]]); // [1, 2, 3]
flatten([
  [1, 2],
  [3, 4],
]); // [1, 2, 3, 4]

// Flattens recursively.
flatten([1, [2, [3, [4, [5]]]]]); // [1, 2, 3, 4, 5]
*/

/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  const result = [];
  const stack = [...value]; // create a copy of the array to work with

  while (stack.length) {
    const item = stack.pop(); // get the last item in the stack

    if (Array.isArray(item)) {
      // if item is an array, push its elements to stack
      stack.push(...item);
    } else {
      // otherwise, add the item to the result
      result.unshift(item); // prepend to result to maintain original order
    }
  }

  return result;
}
