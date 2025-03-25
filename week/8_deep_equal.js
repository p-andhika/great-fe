/*
Implement a function deepEqual that performs a deep comparison between two values. It returns true if two input values are deemed equal, and returns false if not.

    You can assume there are only JSON-serializable values (numbers, strings, boolean, null, objects, arrays).
    There wouldn't be cyclic objects, i.e. objects with circular references.

Examples

deepEqual('foo', 'foo'); // true
deepEqual({ id: 1 }, { id: 1 }); // true
deepEqual([1, 2, 3], [1, 2, 3]); // true
deepEqual([{ id: '1' }], [{ id: '2' }]); // false
*/

/**
 * @param {*} valueA
 * @param {*} valueB
 * @return {boolean}
 */
export default function deepEqual(valueA, valueB) {
  // check primitives for equality
  if (Object.is(valueA, valueB)) {
    return true;
  }

  const bothObjects =
    Object.prototype.toString.call(valueA) === "[object Object]" &&
    Object.prototype.toString.call(valueB) === "[object Object]";
  const bothArrays = Array.isArray(valueA) && Array.isArray(valueB);

  if (!bothObjects && !bothArrays) return false;

  // compare the keys of arrays and objects
  if (Object.keys(valueA).length !== Object.keys(valueB).length) return false;

  for (const key in valueA) {
    if (!deepEqual(valueA[key], valueB[key])) {
      return false;
    }
  }

  // all check passed
  return true;
}

console.log(deepEqual([1, 2, 3], [1, 3, 2]));
