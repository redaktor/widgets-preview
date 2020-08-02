import TypeHinted from './hinted';
import {
  b, bAppend, b2str, ab2b, supportedToByte, isDigitByte, isByteChar, isNodeJS
} from './asciiBytes';
/* this could be used for String representations or lisps :
import AST, { SerializationError, bytes } from './csExpAST';
*/
Number.isFinite = Number.isFinite || function(value) {
    return typeof value === "number" && isFinite(value);
}

export default class Canonical_S_Expressions {

  static readHint(buf: ArrayBuffer, pos: number): [ArrayBuffer, number] {
  	const hint = b('');
    const view = new DataView(buf);
  	while (pos < buf.byteLength) {
  		pos += 1;
  		if (isByteChar(view, pos, ']')) {
  			return [hint, pos];
  		} else {
        bAppend(hint, b(view.getUint8(pos)));
  		}
  	}
    return [hint, pos]
  }

  static readList(buf: ArrayBuffer, pos: number = 0): [any[], number] {
  	const out: any = [];
    const view = new DataView(buf);
  	let readAhead: any = '';
    let newList = null;
  	let hint = null;
  	while (pos < buf.byteLength) {
  		//let ch = buf.readUIntBE(pos, 1);
  		pos += 1;
  		if (isByteChar(view, pos, ')')) {
  			return [out, pos];
  		} else if (isByteChar(view, pos, '(')) {
        [newList, pos] = Canonical_S_Expressions.readList(buf, pos);
  			out.push(newList);
  		} else if (isByteChar(view, pos, '[')) {
        [hint, pos] = Canonical_S_Expressions.readHint(buf, pos);
  		} else if (isByteChar(view, pos, ':')) {
  			pos += 1;
  			if (!(readAhead)) {
          throw new Error(`Colon but no read ahead at position ${pos}`);
  			}
				readAhead = parseInt(readAhead);
				var raw = view.getUint8(pos);
				if (hint) {
					out.push( new TypeHinted(b2str(hint), b(raw)) )
				} else {
					out.push(raw);
				}
				pos += readAhead;
			  readAhead = '';
				hint = null;
  		} else {
        const c = view.getUint8(pos);
        if (!isDigitByte(c)) {
          throw new Error(`Unexpected ${c} at position ${pos}`)
        }
  			readAhead += String.fromCharCode(c);
      }
  	}
    return [out, pos]
  }

  /** @TODO @FIXME :
  loading file descriptors is NOT used in datashards shipper.py yet
  I would suggest an async API here like
  for nodeJS : fs.read(fd)
  and for browsers : FileReader API demo : https://jsfiddle.net/b1m30ywr/
  See also (maybe 'overhead')
  https://github.com/filerjs/filer or https://github.com/jvilk/BrowserFS
  */
  /*
  load(fd: number) {
  	if (fd.readUIntBE(0, 1) !== Bytes['(']) {
  		throw new Error('Expected start of file to begin with (');
  	} else {
      return Canonical_S_Expressions.readList(fd)[0];
  	}
  }
  */

  // should be PUBLIC STATIC ?
  static loadB(b: ArrayBuffer) {
    return Canonical_S_Expressions.readList(b)[0];
  }
  static dumpB(seq: supportedToByte | supportedToByte[]): ArrayBuffer { // PUBLIC STATIC ?
  	return bAppend(b('('), b(seq), b(')'))
  }
  static dump(seq: any[], fd: number) { // PUBLIC STATIC ?
    if (isNodeJS) {
      const fs = require('fs');
      return fs.writeSync(fd, ab2b(b(seq)));
    } else {
      /* TODO FIXME
        Several options to "write files" in the browser
        we could polyfill this e.g. by
        using Blob and URL.createObjectURL.
        Browser Support https://caniuse.com/#search=blob%20urls
      */
      const blob = new Blob([b(seq)]);
      return window.URL.createObjectURL(blob)
      /*
        Better ideas are welcome !!!
      */
    }
  }
}
