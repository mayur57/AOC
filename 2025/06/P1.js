const fs = require("fs");

const input = fs.readFileSync("in.dat", { encoding: "utf8" }).trim();
const example = fs.readFileSync("eg.dat", { encoding: "utf8" }).trim();

function read(str) {
  const lines = str.split("\n").filter((line) => line.trim() !== "");
  const rows = lines.map((line) => line.split(" ").filter((f) => f !== ""));

  if (rows.length === 0) return [];

  const numCols = rows[0].length;
  const result = [];

  for (let col = 0; col < numCols; col++) {
    result.push(rows.map((row) => row[col]));
  }

  return result;
}

function main(str) {
  const problems = read(str);
  let res = 0;
  for (const p of problems) {
    let total;
    const len = p.length;
    if (p.at(len - 1) === "*") {
      if (total === undefined) total = 1;
      for (let i = 0; i < len - 1; i++) {
        total *= parseInt(p[i]);
      }
    } else {
      if (total === undefined) total = 0;
      for (let i = 0; i < len - 1; i++) {
        total += parseInt(p[i]);
      }
    }
    console.log({ total });
    res += total;
  }
  return res;
}

console.log(main(example));
console.log(main(input));
