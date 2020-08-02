import is from '../is';
export const isNodeJS: string | false = (
  (typeof process === 'object' && process.versions && process.versions.node && global.Buffer) &&
  process.versions.node
) || false;
export type supportedToByte = string | number | Buffer | ArrayBuffer;
enum Bytes { '(' = 40, ')' = 41, '[' = 91, ']' = 93, ':' = 58 }
export function isDigitByte(b: number) {
  return is(b, 'integer') && b > 47 && b < 58
}
export function isByteChar(view: DataView, pos: number, c: keyof typeof Bytes) {
  return view.getUint8(pos) === Bytes[c];
}

/**
 * dump as ASCII bytes
 * @param s string | number | Buffer | ArrayBuffer
 * @return ArrayBuffer
 * Raises:
 * Error: If the type is not supported
 */
export function b(s: supportedToByte | supportedToByte[]): ArrayBuffer {
  let l = 0;
  const aB = (ab: ArrayBuffer) => bAppend(b(`${ab.byteLength}:`), ab);
  if (s === '') {
    return new ArrayBuffer(0)
  } else if (s instanceof ArrayBuffer) {
    return aB(s)
  } else if (s instanceof Buffer) {
    return aB(s.buffer.slice(s.byteOffset, s.byteOffset + s.byteLength))
  } else if (Array.isArray(s)) {
    return bAppend(...s.map(b))
  } else if (typeof s === 'string' || typeof s === 'number') {
    s = `${s}`;
    l = s.length;
    s = `${l}:${s}`;
    l = s.length;
    let buf = new ArrayBuffer(l);
    let bufView = new Uint8Array(buf);
    for (var i=0; i < l; i++) { bufView[i] = s.charCodeAt(i) }
    return buf
  } else {
    throw new Error(`Don't know how to serialize type ${typeof s}`)
  }
}
/**
 * Concat ArrayBuffers
 * @param ...arraybuffers two or more ArrayBuffers
 * @return ArrayBuffer
 */
export function bAppend(...arraybuffers: ArrayBuffer[]): ArrayBuffer {
  if (arraybuffers.length < 2) {
    return arraybuffers.length === 1 ? arraybuffers[0] : new ArrayBuffer(0)
  }
  const isValidArray = (x: any) =>
    /Int(8|16|32)Array|Uint(8|8Clamped|16|32)Array|Float(32|64)Array|ArrayBuffer/gi
    .test( {}.toString.call(x) )
  const arrays = [].slice.call(arraybuffers);
  if (arrays.length <= 0 || !isValidArray(arrays[0])) {
    return new Uint8Array(0).buffer
  }
  const ab = arrays.reduce((cbuf: ArrayBuffer, buf: ArrayBuffer, i: number) => {
    if (i === 0) { return cbuf }
    if (!isValidArray(buf)) { return cbuf }
    var tmp = new Uint8Array(cbuf.byteLength + buf.byteLength);
    tmp.set(new Uint8Array(cbuf), 0);
    tmp.set(new Uint8Array(buf), cbuf.byteLength);
    return tmp.buffer
  }, arrays[0])

  return ab
}
/**
 * Serialize ArrayBuffer to String
 * @param ab ArrayBuffer
 * @return string
 */
export function b2str(ab: ArrayBuffer): string {
  return String.fromCharCode.apply(null, new Uint8Array(ab));
}

export function ab2b(ab: ArrayBuffer) {
  if (!isNodeJS) {
    throw new Error('This converts to a nodeJS buffer which is not supported here')
  }
  var buf = Buffer.alloc(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}

const isArrayBufferSupported = (new Buffer(0)).buffer instanceof ArrayBuffer;
function bufferToArrayBufferSlice(buffer: Buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

function bufferToArrayBufferCycle(buffer: Buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
}
export const b2ab = isArrayBufferSupported ? bufferToArrayBufferSlice : bufferToArrayBufferCycle;
