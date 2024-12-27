const lines = await Bun.file('input.txt')
  .text()
  .then((r) => r.trim().split('\n'))

let safe = 0
let checked = 0

const checkLine = (nums: number[], damp = false): boolean => {
  const inc = nums[0] < nums[1]
  for (let x = 1; x < nums.length; x++) {
    const l = nums[x - 1]
    const r = nums[x]

    if (l === r) {
      if (!damp) {
        const newLeft = [...nums.slice(0, x - 1), ...nums.slice(x)]
        const newRight = [...nums.slice(0, x), ...nums.slice(x + 1)]
        const fixed = checkLine(newLeft, true) || checkLine(newRight, true)
        prompt(`${nums} - equal - fixed ${fixed}`)
        return fixed
      }
      return false
    }

    const xInc = l < r
    if (xInc !== inc) {
      if (!damp) {
        const newLeft = [...nums.slice(0, x - 1), ...nums.slice(x)]
        const newRight = [...nums.slice(0, x), ...nums.slice(x + 1)]
        const fixed = checkLine(newLeft, true) || checkLine(newRight, true)
        prompt(`${nums} - change - fixed ${fixed}`)
        return fixed
      }
      return false
    }
    const diff = Math.abs(l - r)
    if (diff > 3 || diff < 1) {
      if (!damp) {
        const newLeft = [...nums.slice(0, x - 1), ...nums.slice(x)]
        const newRight = [...nums.slice(0, x), ...nums.slice(x + 1)]
        const fixed = checkLine(newLeft, true) || checkLine(newRight, true)
        prompt(`${nums} - jump - fixed ${fixed}`)
        return fixed
      }
      return false
    }
  }
  return true
}

for (const line of lines) {
  const nums = line.split(' ').map(Number)

  if (checkLine(nums)) safe++
  checked++
}

console.log(`${checked}/${lines.length}`, safe)
