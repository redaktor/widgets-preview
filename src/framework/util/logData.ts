export const colorCodes: any = {
  black: [[30, 39], '#1C191B'],
  red: [[31, 39], '#DC0005'],
  green: [[32, 39], '#95CC0D'],
  yellow: [[33, 39], '#FFAF00'],
  blue: [[34, 39], '#0D7ECC'],
  magenta: [[35, 39], '#CC0D5A'],
  cyan: [[36, 39], '#1397A3'],
  white: [[37, 39], '#F5F5F5'],
  gray: [[90, 39], '#74757A'],
  grey: [[90, 39], '#74757A'],
  reset: [['',''], '']
}
export const map: any = {
  types: {
    _string: 'green',
    _number: 'blue',
    _boolean: 'reset',
    _null: 'gray',
    _undefined: 'gray',
    _function: 'yellow',
    _key: 'magenta'
  },
  prefixes: {
    message: ' ',
    list: '*',
    'in': '<',
    out :'>',
    neutral: '*',
    muted: '*',
    success: '*',
    warning: '!',
    error: '!'
  },
  colors: {
    neutral: '',
    muted: 'gray',
    success: 'green',
    warning: 'yellow',
    error: 'red'
  }
}
