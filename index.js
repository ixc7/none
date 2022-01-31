#!/usr/bin/env node

const env = {
  maxWidth: process.stdout.columns,
  maxHeight: process.stdout.rows,
  quitKey: 'q'
}

const keyMap = {
  '\x03': 'Ctrl-C',
  '\x04': 'Ctrl-D',
  '\x06': 'Ctrl-F',
  
  '\x0E': 'Ctrl-N',
  '\x1B[110;6u': 'Ctrl-Shift-N',
  
  '\x13': 'Ctrl-S',
  '\x1B[115;6u': 'Ctrl-Shift-S',
  
  '\x11': 'Ctrl-Q',
  '\x1B[113;6u': 'Ctrl-Shift-Q',
  
  '\x17': 'Ctrl-W',
  '\x1B[119;6u': 'Ctrl-Shift-W',
  
  '\x1A': 'Ctrl-Z',
  '\x1B[122;6u': 'Ctrl-Shift-Z',
  
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
  '\x1B[1;8D': 'Ctrl-Opt-Shift-Left',

  '\x1B[C': 'Right',
  '\x1B[1;5C': 'Ctrl-Right',
  '\x1Bf': 'Opt-Right',
  '\x1B[1;2C': 'Shift-Right',
  '\x1B[1;6C': 'Ctrl-Shift-Right',
  '\x1B[1;4C': 'Opt-Shift-Right',
  '\x1B[1;8C': 'Ctrl-Opt-Shift-Right',

  '\x1B[A': 'Up',
  '\x1B[1;5A': 'Ctrl-Up',
  '\x1B[1;3A': 'Opt-Up',
  '\x1B[1;2A': 'Shift-Up',
  '\x1B[1;6A': 'Ctrl-Shift-Up',
  '\x1B[1;4A': 'Opt-Shift-Up',
  '\x1B[1;8A': 'Ctrl-Opt-Shift-Up',
  
  '\x1B[B': 'Down',
  '\x1B[1;5B': 'Ctrl-Down',
  '\x1B[1;3B': 'Opt-Down',
  '\x1B[1;2B': 'Shift-Down',
  '\x1B[1;6B': 'Ctrl-Shift-Down',
  '\x1B[1;4B': 'Opt-Shift-Down',
  '\x1B[1;8B': 'Ctrl-Opt-Shift-Down'

  // ...
}

process.stdin.resume()
process.stdin.setRawMode(true)

process.stdin.on('data', x => {
  const str = Buffer.from(x).toString()

  if (str === env.quitKey) process.exit(0)
  else if (keyMap[str]) console.log(keyMap[str])
  else console.log({str})
})

process.on('SIGWINCH', () => {
  env.maxWidth = process.stdout.columns
  env.maxHeight = process.stdout.rows
  console.log(`SIGWINCH: ${env.maxWidth}, ${env.maxHeight}`)
})

process.on('exit', x => console.log('quit', x))
console.log(`press '${env.quitKey}' to quit`)
