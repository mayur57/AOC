const fs = require("fs");

const input = fs.readFileSync("in.dat", { encoding: "utf8" }).trim();
const example = fs.readFileSync("eg.dat", { encoding: "utf8" }).trim();

function readGrid(str) {
  const lines = str.split("\n").map(l => l.replace(/\s+$/,""));
  const height = lines.length;
  const width = Math.max(...lines.map(l => l.length));

  const grid = lines.map(l => l.padEnd(width, " "));
  return { grid, height, width };
}

function isBlankColumn(grid, col) {
  for (let r = 0; r < grid.length - 1; r++) {
    if (grid[r][col] !== " ") return false;
  }
  return true;
}

function readNumberColumn(grid, col) {
  let s = "";
  for (let r = 0; r < grid.length - 1; r++) {
    const ch = grid[r][col];
    if (ch !== " ") s += ch;
  }
  return s === "" ? null : parseInt(s);
}

function main(str) {
  const { grid, height, width } = readGrid(str);

  let col = width - 1;
  let res = 0;

  while (col >= 0) {
    while (col >= 0 && isBlankColumn(grid, col)) col--;
    if (col < 0) break;

    const numbers = [];

    while (col >= 0 && !isBlankColumn(grid, col)) {
      const n = readNumberColumn(grid, col);
      if (n !== null) numbers.push(n);
      col--;
    }

    console.log({numbers})

    const opCol = col + 1;
    const op = grid[height - 1][opCol];

    let total;
    if (op === "*") {
      total = 1;
      for (const n of numbers) total *= n;
    } else {
      total = 0;
      for (const n of numbers) total += n;
    }

    res += total;
  }

  return res;
}

console.log(main(example));
console.log(main(input));
