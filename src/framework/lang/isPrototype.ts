export default function isPrototype(v: any) {
  const CT = !!v && v.constructor;
  return v === ((typeof CT === 'function' && CT.prototype) || Object.prototype)
}
