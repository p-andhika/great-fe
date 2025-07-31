/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export default function throttle(func, wait) {
  let shouldThrottle = false;

  return function (...args) {
    if (!shouldThrottle) {
      func.apply(this, args);

      shouldThrottle = true;

      setTimeout(() => {
        shouldThrottle = false;
      }, wait);
    }
  };
}

// A function to be throttled
function sayHello(msg) {
  console.log(`${new Date().toISOString()}: ${msg}`);
}

// Wrap the function with throttle
const throttledSayHello = throttle(sayHello, 1000); // Allow only once per second

// Simulate calling the function rapidly (every 200ms)
let count = 0;
const interval = setInterval(() => {
  throttledSayHello(`Hello number ${++count}`);

  if (count === 10) {
    clearInterval(interval); // Stop after 10 calls
  }
}, 200);
