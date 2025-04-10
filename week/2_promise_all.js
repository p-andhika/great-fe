/*
"Promise.all() is a method that takes an iterable of elements (usually Promises) as an input, and returns a single Promise that resolves to an array of the results of the input promises. This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error."

Promise.all() is frequently used when there are multiple concurrent API requests and we want to wait for all of them to have completed to continue with code execution, usually because we depend on data from both responses.

const [userData, postsData, tagsData] = await Promise.all([
  fetch('/api/user'),
  fetch('/api/posts'),
  fetch('/api/tags'),
]);

Let's implement our own version of Promise.all(), a promiseAll function, with the difference being the function takes in an array instead of an iterable. Be sure to read the description carefully and implement accordingly!

Examples

// Resolved example.
const p0 = Promise.resolve(3);
const p1 = 42;
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 100);
});

await promiseAll([p0, p1, p2]); // [3, 42, 'foo']

// Rejection example.
const p0 = Promise.resolve(30);
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('An error occurred!');
  }, 100);
});

try {
  await promiseAll([p0, p1]);
} catch (err) {
  console.log(err); // 'An error occurred!'
}
*/

/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);
    let unresolved = iterable.length;

    if (unresolved === 0) {
      resolve(results);
      return;
    }

    iterable.forEach(async (item, index) => {
      try {
        const value = await item;
        results[index] = value;
        unresolved -= 1;

        if (unresolved === 0) {
          resolve(results);
        }
      } catch (error) {
        reject(error);
      }
    });
  });
}

// ====================
// test
const p = promiseAll([]);
console.log(p); // Promise

const res1 = await promiseAll([]);
console.log(res1); // []

const p0 = Promise.resolve(2);
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(3);
  }, 10);
});

const res2 = await promiseAll([p0, p1]);
console.log(res2); // [2, 3]
