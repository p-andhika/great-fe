/*
Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each takes a single argument.

Implement the curry function which accepts a function as the only argument and returns a function that accepts single arguments and can be repeatedly called until at least the minimum number of arguments have been provided (determined by how many arguments the original function accepts). The initial function argument is then invoked with the provided arguments.

Examples
function add(a, b) {
  return a + b;
}

const curriedAdd = curry(add);
curriedAdd(3)(4); // 7

const alreadyAddedThree = curriedAdd(3);
alreadyAddedThree(4); // 7

function multiplyThreeNumbers(a, b, c) {
  return a * b * c;
}

const curriedMultiplyThreeNumbers = curry(multiplyThreeNumbers);
curriedMultiplyThreeNumbers(4)(5)(6); // 120

const containsFour = curriedMultiplyThreeNumbers(4);
const containsFourMulFive = containsFour(5);
containsFourMulFive(6); // 120
*/

/**
 * @param {Function} func
 * @return {Function}
 */
export default function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return curried.bind(this, ...args);
  };
}
