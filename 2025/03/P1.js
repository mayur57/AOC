const fs = require('fs');

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim();
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim();

function main(str) {
  const lines = str.split("\n");
  const res = lines.reduce((sum, l) => sum + compute(l, 2, l.length), 0);
  return res;
}

// LeetCode 321: Create Largest Number - Hard
// https://leetcode.com/problems/create-maximum-number/description/
function compute(str, k, n) {
  const stack = [];
  let toRemove = n - k;

  for (const ch of str) {
    while (
      toRemove > 0 &&
      stack.length > 0 &&
      stack[stack.length - 1] < ch
    ) {
      stack.pop();
      toRemove--;
    }
    stack.push(ch);
  }

  return parseInt(stack.slice(0, k).join(''));
}

console.log(main(example));
console.log(main(input));
  