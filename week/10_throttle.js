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

const sayHello = () => {
  console.log("Hello");
};
const throttled = throttle(func, wait);
