/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
 const hasFrom = Buffer.hasOwnProperty('from') && typeof Buffer.from === 'function';
 export default function copyBuffer(buf: Buffer, isDeep: boolean = false) {
   if (isDeep) { return buf.slice() }
   if (hasFrom) { return Buffer.from(buf) }
   let copy = new Buffer(buf.length);
   buf.copy(copy);
   return copy;
 }
