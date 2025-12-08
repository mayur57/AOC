const fs = require('fs');

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim();
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim();

function main(str) {
  const lines = str.split('\n');
  const h = lines.length;
  if (h === 0) return 0;
  const w = lines[0].length;

  let sr = -1;
  let sc = -1;
  for (let r = 0; r < h; r++) {
    const c = lines[r].indexOf("S");
    if (c !== -1) {
      sr = r;
      sc = c;
      break;
    }
  }

  let currCols = new Set([sc]);
  let splits = 0;
  const splitters = new Set();
  splitters.add(`${sr},${sc}`);

  for (let r = sr; r < h - 1; r++) {
    const nr = r + 1;
    const nc = new Set();

    for (const c of currCols) {
      if (c < 0 || c >= w) continue;

      const ch = lines[nr][c];

      if (ch === "." || ch === "S" || ch === " ") {
        nc.add(c);
        splitters.add(`${nr},${c}`);
      } else if (ch === "^") {
        splits++;
        const left = c - 1;
        const right = c + 1;
        if (left >= 0) {
          nc.add(left);
          splitters.add(`${nr},${left}`);
        }
        if (right < w) {
          nc.add(right);
          splitters.add(`${nr},${right}`);
        }
      } else {
        nc.add(c);
        splitters.add(`${nr},${c}`);
      }
    }

    currCols = nc;
    if (currCols.size === 0) break;
  }

  return { splits, splitters, lines };
}

// OPTIONAL -- beam splitting viz
function writeBeamPaths(str, outputFile) {
  const { splitters, lines } = main(str);
  const H = lines.length;
  const W = lines[0].length;
  
  const result = [];
  for (let r = 0; r < H; r++) {
    let row = '';
    for (let c = 0; c < W; c++) {
      const key = `${r},${c}`;
      if (lines[r][c] === 'S') {
        row += 'S';
      } else if (lines[r][c] === '^') {
        row += '^';
      } else if (splitters.has(key)) {
        row += '|';
      } else {
        row += lines[r][c];
      }
    }
    result.push(row);
  }
  
  fs.writeFileSync(outputFile, result.join('\n') + '\n');
}

console.log(main(example).splits);
console.log(main(input).splits);

// OPTIONAL -- beam splitting viz
// writeBeamPaths(example, 'eg.out');
// writeBeamPaths(input, 'in.out');
