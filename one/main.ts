const i = await Bun.file('./input.txt').text()

const lines = i.split('\n')

const lefts: number[] = []
const rights: number[] = []

for (const line of lines) {
  if (!line) continue
  const [l, r] = line.split('   ')
  if (!isNaN(Number(l))) lefts.push(Number(l))
  else console.log('l', l, line)
  if (!isNaN(Number(r))) rights.push(Number(r))
  else console.log('r', r, line)
}

const sortedL = lefts.filter((n) => n !== undefined).sort()
const sortedR = rights.filter((n) => n !== undefined).sort()

const dist: number[] = []

for (const i in sortedL) {
  const d = sortedL[i] - sortedR[i]
  dist.push(Math.abs(d))
}

const total = dist.reduce((a, c) => a + c)
console.log(total)

const rightCounts = new Map<number, number>()

for (const r of rights) {
  const val = rightCounts.get(r)
  if (val) {
    rightCounts.set(r, val + 1)
  } else {
    rightCounts.set(r, 1)
  }
}

let total2 = 0

for (const l of lefts) {
  const val = l * (rightCounts.get(l) ?? 0)
  total2 += val
}

console.log(total2)
