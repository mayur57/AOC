const fs = require('fs')

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()

function main(str) {
  const dirList = str.split('\n')
  let dial = 50
  let zeroes = 0
  for (let i = 0; i < dirList.length; i++) {
    let dir = dirList[i].slice(0,1) == "L" ? -1 : 1
    let rotation = parseInt(dirList[i].slice(1))
    dial = (dial + dir * rotation + 100) % 100
    dial == 0 && zeroes++
  }
  return zeroes
}

console.log(main(example))
console.log(main(input))
