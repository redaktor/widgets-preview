import has from '@dojo/framework/core/has';
function _repeat(str: string, num: number) { return new Array(num + 1).join(str); };

export function escape(str: string) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
export function unescape(str: string) {
  str = str.toString();
  var mod = str.length % 4;
  if (mod !== 0) { str += _repeat('=', 4 - mod); }
  return str.replace(/\-/g, '+').replace(/_/g, '/');
}

export function encode(str: string) {
  if (has('host-node')) {
    return Buffer.from(str, 'utf8').toString('base64');
  } else {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(m, p1) {
      return String.fromCharCode(parseInt(('0x'+p1), 16));
    }));
  }
}
export function decode(b64String: string | Buffer) {
  b64String = b64String.toString();
  if (has('host-node')) {
    return Buffer.from(b64String, 'base64').toString('utf8');
  } else {
    return decodeURIComponent(b64String.split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}
export function urlEncode(str: string): string {
  return escape(encode(str));
}
export function urlDecode(b64String: string | Buffer): string {
  b64String = b64String.toString();
  return decode(unescape(b64String));
}
