const fs = require("fs");
const path = require("path");

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim();
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim();

function main(str) {
  const lines = str.split("\n");
  let res = 0;
  let dirs = [
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, 0],
    [1, -1],
  ];
  for (let px = 0; px < lines.length; px++) {
    for (let py = 0; py < lines[px].length; py++) {
      if (lines[px][py] !== "@") continue;

      let rolls = 0;
      for (let [dx, dy] of dirs) {
        const nx = px + dx;
        const ny = py + dy;
        if (nx >= 0 && ny >= 0 && nx < lines.length && ny < lines[nx].length) {
          if (lines[nx][ny] === "@") {
            rolls++;
          }
        }
      }
      if (rolls < 4) res++;
    }
  }
  return res;
}

console.log(main(example));
console.log(main(input));
