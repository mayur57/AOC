const fs = require('fs')

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()

function main(str) {
  const dirList = str.split('\n')
  let dial = 50
  let zeroes = 0

  for (let i = 0; i < dirList.length; i++) {
    let line = dirList[i]
    let dir = line.slice(0, 1) == 'L' ? -1 : 1
    let rotation = parseInt(line.slice(1), 10)

    let dist = 0
    dist = dir === 1 ? (100 - dial) % 100 : (dist = dial)
    if (dist === 0) dist = 100

    if (rotation >= dist) {
      zeroes += 1 + Math.floor((rotation - dist) / 100)
    }

    let newDial = (dial + dir * rotation) % 100
    if (newDial < 0) newDial += 100
    dial = newDial
  }

  return zeroes
}

console.log(main(example))
console.log(main(input))
