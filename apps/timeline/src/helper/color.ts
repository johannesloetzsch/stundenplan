export function stringReverse(s?: string) {
  return (s || "").split('').reverse().join('')
}

export function strToColor(s: string) {
  const offset = 65  // A
  const spread = 5  // ~265/(A-z)
  const int = new TextEncoder().encode(s).reduce((acc, i) => {
    const shifted = (acc << 8) & 0xFFFFFF
    const overflow = acc >> (24-8) & 0xFF
    return (shifted + overflow + (i-offset)*spread) % 0x1000000
  }, 0)
  const intAdjusted = 0xFFFFFF - (int & 0x7F7F7F)  // only light colors
  return "#" + intAdjusted.toString(16).padStart(6, '0')
}

export function strToHex(s: string) {
  const offset = 65  // A
  const spread = 5  // ~265/(A-z)
  const int = new TextEncoder().encode(s).reduce((acc, i) => {
    return (spread * (acc + (i-offset))) % 0x100
  }, 0)
  const intAdjusted = 0x80 + (int & 0x7F)  // only light colors
  return intAdjusted.toString(16).padStart(2, '0')
}

export function strDiffToHex(s: string, max:string) {
  const sConstLen = s.padStart(max.length, "A").substring(0, max.length)
  const offset = 65  // A
  const mult = 30
  const intMax = new TextEncoder().encode(stringReverse(max)).reduce((acc, i) => {
    return acc/2 + (i-offset)
  }, 0)
  const int = new TextEncoder().encode(stringReverse(sConstLen)).reduce((acc, i) => {
    return acc/2 + (i-offset)
  }, 0)
  const intAdjusted = 0xFF - Math.min(mult*Math.abs(Math.floor(int-intMax)), 0x7F)  // only light colors
  console.log(s, intAdjusted)
  return intAdjusted.toString(16).padStart(2, '0')
}
