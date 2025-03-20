/*
Array.prototype.filter creates a new array populated with the results of calling a provided function on every element in the calling array.

For sparse arrays (e.g. [1, 2, , 4]), the empty values should be ignored while traversing the array (i.e. they should not be in the resulting array).

Implement Array.prototype.filter. To avoid overwriting the actual Array.prototype.filter which is being used by the autograder, we shall instead implement it as Array.prototype.myFilter.
Examples

[1, 2, 3, 4].myFilter((value) => value % 2 == 0); // [2, 4]
[1, 2, 3, 4].myFilter((value) => value < 3); // [1, 2]

Notes

The filter callback function takes in more than just the element! There's also a second parameter for Array.prototype.filter as well. You are recommended to read the specification for Array.prototype.filter on MDN Docs before attempting.
*/

/**
 * @template T
 * @param { (value: T, index: number, array: Array<T>) => boolean } callbackFn
 * @param {any} [thisArg]
 * @return {Array<T>}
 */
Array.prototype.myFilter = function (callbackFn, thisArg) {
  // check if the first argument is actually a function
  if (
    typeof callbackFn !== "function" ||
    !callbackFn.call ||
    !callbackFn.apply
  ) {
    throw new TypeError(`${callbackFn} is not a function`);
  }

  // get the length of the current array
  const arrayLength = this.length;

  // create new empty array to store results
  const resultArray = [];

  // variable to track position in the original array
  let currentIndex = 0;

  // variable to track position in the result array
  let resultIndex = 0;

  // loop through each element of the original array
  while (currentIndex < arrayLength) {
    // check if current index actually exists in the array
    // (this handles sparse arrays where some indices might be empty)
    const indexExists = Object.hasOwn(this, currentIndex);

    if (indexExists) {
      // get the value at the current index
      const currentValue = this[currentIndex];

      // call the provided callback function with:
      // - current value
      // - current index
      // - the original array (this)
      // the 'thisArg' allows controlling what 'this' refers to inside the callback
      const keepThisItem = Boolean(
        callbackFn.call(thisArg, currentValue, currentIndex, this),
      );

      // if the callback returned a truthy value (converted to true)
      if (keepThisItem == true) {
        // add this item to our results
        resultArray[resultIndex] = currentValue;

        // move to next position in the result array
        resultIndex += 1;
      }
    }

    // move to next position in original array
    currentIndex += 1;
  }

  // return the new filtered array
  return resultArray;
};

// ====================
// test
const result = [1, 0, 3].myFilter((element) => {
  return element == 1;
});

console.log(result); // [1]
