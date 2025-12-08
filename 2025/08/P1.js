const fs = require("fs");

const input = fs.readFileSync("in.dat", { encoding: "utf8" }).trim();
const example = fs.readFileSync("eg.dat", { encoding: "utf8" }).trim();

function euclidean(p1, p2) {
  const [x1, y1, z1] = p1;
  const [x2, y2, z2] = p2;
  return Math.sqrt(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
  );
}

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array(n).fill(1);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    if (this.size[rootX] < this.size[rootY]) {
      this.parent[rootX] = rootY;
      this.size[rootY] += this.size[rootX];
    } else {
      this.parent[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
    }
    return true;
  }

  getComponentSizes() {
    const sizes = new Map();
    for (let i = 0; i < this.parent.length; i++) {
      const root = this.find(i);
      sizes.set(root, this.size[root]);
    }
    return Array.from(sizes.values());
  }
}

function main(str, numPairs) {
  const pts = str.split("\n");
  const coords = pts.map((p) => p.split(",").map(Number));

  const dc = [];

  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const d = euclidean(coords[i], coords[j]);
      dc.push({ idx1: i, idx2: j, distance: d });
    }
  }

  dc.sort((a, b) => a.distance - b.distance);

  const n = coords.length;
  const uf = new UnionFind(n);

  for (let i = 0; i < Math.min(numPairs, dc.length); i++) {
    const { idx1, idx2 } = dc[i];
    uf.union(idx1, idx2);
  }

  const sizes = uf.getComponentSizes();
  sizes.sort((a, b) => b - a);

  const result = sizes[0] * sizes[1] * sizes[2];
  return result;
}

console.log(main(example, 10));
console.log(main(input, 1000));
