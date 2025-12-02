const fs = require('fs');

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim().replace("\n", "");
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim().replace("\n", "");

function invalid(s) {
  let len = s.length
  for(let patternLen = 1; patternLen <= Math.floor(len / 2); patternLen++) {
    if(len % patternLen !== 0) continue
    let pattern = s.substring(0, patternLen)
    let repeats = len / patternLen
    if(repeats < 2) continue
    let constructed = pattern.repeat(repeats)
    if(constructed === s) {
      return true
    }
  }
  return false
}

function main(str) {
  const a = []
  str.split(",").forEach(x => a.push(x.split('-')));
  let res = 0
  for(let q of a) {
    for(let i=parseInt(q[0]); i<=parseInt(q[1]); i++) {
        if(invalid(i.toString())) {
          res += i
        }
    }
  }

  return res
}

console.log(main(example));
console.log(main(input));