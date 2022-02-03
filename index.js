#!/usr/bin/env node

const env = {
  maxWidth: process.stdout.columns,
  maxHeight: process.stdout.rows,
  quitKey: 'q',
  gotoBottom: `\x1b[${process.stdout.rows};1H`,
  gotoTop: '\x1b[1;1H',
  
  gotoLeft: `\x1B[${process.stdout.columns}D`,
  newline: `\x1B[${process.stdout.columns}D\x1b[B`,
  // gotoLeft + down 1

  gotoRight: `\x1B[${process.stdout.columns}C`,
  jumpBackspace: '\x1B\b',
  
  sc: '\x1b7',
  rc: '\x1b8', 
  // TODO handle buffer height larger than screen

  tab: '\t',
  startTxt: `
    [keybindings]

    + 'q' quit
    + 'S' save cursor position
    + 'R' restore cursor position
    + <enter> newline
    + <opt> <arrows> jump
      - 'Up' top of screen
      - 'Down' bottom of screen
      - 'Right' end of line
      - 'Left' beginning of line
  `
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

  '\r': env.newline,
  
  '\t': env.tab,
  '\x1B[Z': 'Shift-Tab',

  '\x1B': 'Ctrl-[',
  '\x1D': 'Ctrl-]',

  // '\x1B[D': 'Left',
  '\x1B[H': 'Ctrl-Left (Home)',
  // '\x1Bb': 'Opt-Left',
  '\x1Bb': env.gotoLeft,
  '\x1B[1;2D': 'Shift-left',
  '\x1B[1;6D': 'Ctrl-Shift-Left',
  '\x1B[1;4D': 'Opt-Shift-Left',
  '\x1B[1;8D': 'Ctrl-Opt-Shift-Left',

  // '\x1B[C': 'Right',
  '\x1B[1;5C': 'Ctrl-Right',
  // '\x1Bf': 'Opt-Right',
  '\x1Bf': env.gotoRight,
  '\x1B[1;2C': 'Shift-Right',
  '\x1B[1;6C': 'Ctrl-Shift-Right',
  '\x1B[1;4C': 'Opt-Shift-Right',
  '\x1B[1;8C': 'Ctrl-Opt-Shift-Right',

  // '\x1B[A': 'Up',
  '\x1B[1;5A': 'Ctrl-Up',
  '\x1B[1;3A': env.gotoTop,
  '\x1B[1;2A': 'Shift-Up',
  '\x1B[1;6A': 'Ctrl-Shift-Up',
  '\x1B[1;4A': 'Opt-Shift-Up',
  '\x1B[1;8A': 'Ctrl-Opt-Shift-Up',

  // '\x1B[B': 'Down',
  '\x1B[1;5B': 'Ctrl-Down',
  '\x1B[1;3B': env.gotoBottom,
  '\x1B[1;2B': 'Shift-Down',
  '\x1B[1;6B': 'Ctrl-Shift-Down',
  '\x1B[1;4B': 'Opt-Shift-Down',
  '\x1B[1;8B': 'Ctrl-Opt-Shift-Down',

  '\x1B\b': env.jumpBackspace,

  'S': env.sc,
  'R': env.rc

  // ...
}

process.stdin.resume()
process.stdin.setRawMode(true)

process.stdin.on('data', (x) => {
  const str = Buffer.from(x).toString()

  if (str === env.quitKey) process.exit(0)

  if (keyMap[str]) {
    return process.stdout.write(keyMap[str])
  } 
  process.stdout.write(str)
})

process.on('SIGWINCH', () => {
  env.maxWidth = process.stdout.columns
  env.maxHeight = process.stdout.rows
  console.log(`SIGWINCH: ${env.maxWidth}, ${env.maxHeight}`)
})

process.on('exit', code => { console.log(`quit with code: ${code}`) })
console.log(env.startTxt)
