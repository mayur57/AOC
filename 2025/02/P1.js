const fs = require('fs');

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim().replace("\n", "");
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim().replace("\n", "");

function invalid(s) {
  let len = s.length
  if(len % 2 !== 0) return false
  let mid = len / 2
  for(let i = 0; i < mid; i++) {
    if(s[i] !== s[mid + i]) return false
  }
  return true
}

function main(str) {
  const a = []
  str.split(",").forEach(x => a.push(x.split('-')));
  let res = 0
  for(let q of a) {
    for(let i=parseInt(q[0]); i<=parseInt(q[1]); i++) {
        if(invalid(i.toString())) {
          console.log(i)
          res += i
        }
    }
  }

  return res
}

console.log(main(example));
console.log(main(input));

