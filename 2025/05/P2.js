const fs = require('fs');

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim();
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim();

// LeetCode 56: Merge Intervals - Medium
// https://leetcode.com/problems/merge-intervals/description/
function merge(list) {
  const sorted = list.slice().sort((a, b) => a[0] - b[0]);
  const merged = [];

  for (const [start, end] of sorted) {
    if (merged.length === 0) {
      merged.push([start, end]);
      continue;
    }

    const last = merged[merged.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }

  return merged;

}

function main(str) {
  let [intr, ingr] = str.split("\n\n")
  let intervals = intr.split("\n").map(str => {
    const [a, b] = str.split('-').map(Number);
    return [a, b];
  })
  
  let merged = merge(intervals)
  let res = merged.reduce((sum, [start, end]) => sum + (end - start + 1), 0)

  return res;
}

console.log(main(example));
console.log(main(input));
  