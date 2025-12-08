const fs = require('fs');

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim();
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim();

function main(str) {
  const lines = str.split('\n');
  const h = lines.length;
  if (h === 0) return 0n;
  const w = lines[0].length;

  let sr = -1;
  let sc = -1;
  for (let r = 0; r < h; r++) {
    const c = lines[r].indexOf('S');
    if (c !== -1) {
      sr = r;
      sc = c;
      break;
    }
  }

  let curr = Array(w).fill(0n);
  curr[sc] = 1n;

  for (let r = sr; r < h - 1; r++) {
    const nr = r + 1;
    const next = Array(w).fill(0n);

    for (let c = 0; c < w; c++) {
      const count = curr[c];
      if (count === 0n) continue;

      const ch = lines[nr][c];

      if (ch === '^') {
        const left = c - 1;
        const right = c + 1;
        if (left >= 0) next[left] += count;
        if (right < w) next[right] += count;
      } else {
        next[c] += count;
      }
    }

    curr = next;
  }

  return curr.reduce((acc, v) => acc + v, 0n);
}

console.log(main(example).toString());
console.log(main(input).toString());