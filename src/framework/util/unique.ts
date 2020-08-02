import uuid4 from '../../dojo/core/uuid';
import crypto from '../crypto/main';

/* UUID : if no argument version 4 else if string version 5 */
export function uuid(str?: string) {
  if (typeof str === 'string') {
    /* uuid v5 : */
    let h = crypto.hash(str, 'sha1', 'buffer');
    h[8] = h[8] & 0x3f | 0xa0; /* variant */
    h[6] = h[6] & 0x0f | 0x50; /* version */
    return h.toString('hex', 0, 16).match(/.{1,8}/g).join('-');
  } else {
    /* uuid v4 */
    return uuid4();
  }
}

/* NONCE - if fixed variable length */
export function nonce(lengthOrMin: number = 64, maxLength?: number): string {
  let length = lengthOrMin;
  if (!!maxLength && typeof maxLength === 'number') {
    length = Math.round(Math.random()*(maxLength-lengthOrMin)+lengthOrMin);
  }
  return crypto.randomBytes(length).toString('base64').replace(/[^\w]/g, '');
}
