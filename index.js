#!/usr/bin/env node

const keyMap = {
  '\x03': 'Ctrl-C',
  '\x04': 'Ctrl-D',
  // '\x11': 'Ctrl-Q',
  '\x1A': 'Ctrl-Z',
  '\x7F': 'Backspace',
  '\r': 'Return',
  '\t': 'Tab',
  // ...arrow keys, opt+arrows, ctrl+arrows
}

process.stdin.resume()
process.stdin.setRawMode(true)

process.stdin.on('data', x => {
  const str = Buffer.from(x).toString()

  if (str === '\x11') process.exit(0)
  else if (keyMap[str]) console.log(keyMap[str])
  else console.log(str)
})

process.on('exit', x => console.log('quit', x))
