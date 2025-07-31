/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
function throttle(func, wait) {
  let shouldThrottle = false;

  return function (...args) {
    if (shouldThrottle) return;

    shouldThrottle = true;

    setTimeout(function () {
      shouldThrottle = false;
    }, wait);

    func.apply(this, args);
  };
}

// A function to be throttled
function sayHello() {
  console.log("Hello");
}

// Wrap the function with throttle
const throttledSayHello = throttle(sayHello, 1000); // Allow only once per second

// Simulate calling the function rapidly (every 200ms)
let count = 0;
const interval = setInterval(() => {
  count++;
  throttledSayHello();

  if (count === 10) {
    clearInterval(interval); // Stop after 10 calls
  }
}, 200);
