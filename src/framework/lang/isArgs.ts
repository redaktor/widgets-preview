export default function isArgs(v: any) {
  return Object.prototype.toString.call(v) === '[object Arguments]'
}
