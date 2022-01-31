#!/usr/bin/env node

const keyMap = {
  '\x03': 'Ctrl-C',
  '\x04': 'Ctrl-D',
  '\x06': 'Ctrl-F',
  
  '\x0E': 'Ctrl-N',
  '\x1B[110;6u': 'Ctrl-Shift-N',
  
  '\x13': 'Ctrl-S',
  '\x1B[115;6u': 'Ctrl-Shift-S',
  
  '\x11': 'Ctrl-Q',
  '\x14': 'Ctrl-W',
  '\x1A': 'Ctrl-Z',
  '\x7F': 'Backspace',
  '\r': 'Return',
  
  '\t': 'Tab',
  '\x1B[Z': 'Shift-Tab',

  '\x1B': 'Ctrl-[',
  '\x1D': 'Ctrl-]',

  '\x1B[D': 'Left',
  '\x1B[H': 'Ctrl-Left (Home)',
  '\x1Bb': 'Opt-Left',
  '\x1B[1;2D': 'Shift-left',
  '\x1B[1;6D': 'Ctrl-Shift-Left',
  '\x1B[1;4D': 'Opt-Shift-Left',
  '\x1B[1;8D': 'Ctrl-Opt-Shift-Left'

  // ...
}

process.stdin.resume()
process.stdin.setRawMode(true)

process.stdin.on('data', x => {
  const str = Buffer.from(x).toString()

  if (str === 'f') process.exit(0)
  else if (keyMap[str]) console.log(keyMap[str])
  else console.log({str})
})

process.on('SIGWINCH', () => console.log('Resize'))

process.on('exit', x => console.log('quit', x))
console.log(`press 'f' to quit`)
