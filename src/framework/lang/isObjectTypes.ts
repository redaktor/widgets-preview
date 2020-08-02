export function isObjectLike(v: any) { return !!v && typeof v === 'object' }
export function isObject(v: any) { return isObjectLike(v) || typeof v === 'function' }
