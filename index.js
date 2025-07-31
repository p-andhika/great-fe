function flatten(value) {
  const stack = [...value];
  const result = [];

  while (stack.length) {
    const item = stack.pop();

    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }

  return result;
}

console.log(flatten([]));
console.log(flatten([1, [2]]));
console.log(flatten([1, [2, [3]]]));
