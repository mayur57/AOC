const fs = require('fs');

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim();
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim();

function neighbors(grid, px, py) {
  const dirs = [
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, 0],
    [1, -1],
  ];
  
  let count = 0;
  for (let [dx, dy] of dirs) {
    const nx = px + dx;
    const ny = py + dy;
    if (nx >= 0 && ny >= 0 && nx < grid.length && ny < grid[nx].length) {
      if (grid[nx][ny] === "@") {
        count++;
      }
    }
  }
  return count;
}

function main(str) {
  let lines = str.split("\n").map(line => line.split(""));
  let changed = true;
  let removed = 0;
  
  while (changed) {
    changed = false;
    const candidate = [];
    
    for (let px = 0; px < lines.length; px++) {
      for (let py = 0; py < lines[px].length; py++) {
        if (lines[px][py] === "@") {
          const n = neighbors(lines, px, py);
          if (n < 4) {
            candidate.push([px, py]);
            changed = true;
          }
        }
      }
    }
    
    for (let [px, py] of candidate) {
      lines[px][py] = ".";
      removed++;
    }
  }
  
  return removed;
}

console.log(main(example));
console.log(main(input));
  