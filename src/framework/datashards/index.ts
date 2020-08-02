import csExp from '../csExpressions';
import { b, bAppend, b2ab, isNodeJS } from '../csExpressions/asciiBytes';
import { urlEncode, urlDecode } from './base64';
// { crypto as cr } or Forge : AES-256-ctr in the browser:
// import Crypto, { crypto as cr } from '../crypto';
/** @TODO typescript forge …
@NOTE
WE NOW USE FORGE by digitalbazaar !
For browser use [for now] you need to use before this :
<script src="https://cdn.jsdelivr.net/npm/node-forge@0.9.1/dist/forge.min.js"></script>
*/

/** @TODO FIXME TypeHinted in asciiBytes b */

declare let forge: any;
if (isNodeJS) {
  forge = require('node-forge');
}
/*
stdout, stdin and stderr get assigned a file descriptor too:
fd 0 through 2
*/
enum Constants {
  // ? The size of the IV in Python Cryptdome should be 32 bytes
  IV_SIZE = 16,
  CHUNK_SIZE = 32768,
  MAX_RAW_SIZE = CHUNK_SIZE - 13,  // 13 is the number of bits for sExp
  KEY_SIZE = 32
}
export class NotImplementedError extends Error {
	constructor(message: string /*SerializationError details*/) {
		super(message)
	}
}
export default class Shipper {
	private canNot = `Store doesn't support the method`;
  private canNotLoad = `Could not load file`;
  private canOnly = `Shipper can only handle`;
  protected store: any = {}; /** @TODO TS the store interfaces */
  constructor(store: any) {
    this.store = store
  }

  /* browser https://jsfiddle.net/b1m30ywr/ */
  async upload(fd: number | File, keyFn = this.generateKey) {
  /**
   * Upload a file to a store
   * @param fd The file to send (file-like object)
   * @param keyFn Function to generate the key, used for testing (function)
   * @param cbFn Callback function (idsc: string) => any
   * @return new Promise<string>((resolve, reject) => {})
   * Raises:
   * NotImplementedError: If the store does not support the 'put' method
   */
    const fs = isNodeJS ? require('fs') : new FileReader();
    if (!this.store.hasOwnProperty('put')) {
      throw new NotImplementedError(`${this.canNot} PUT`);
    }
    if (!isNodeJS && !(fd instanceof File)) {
      throw new NotImplementedError(`Handles only Files. Submit a FileList item.`);
    }
    const { size } = isNodeJS ? fs.fstatSync(fd) : (<File>fd).size;
    const key = keyFn();
    //.py urlsafe_b64encode + rstrip(b'=') + decode() TODO ? :
    const b64Key = urlEncode(key.toString('ascii')).replace(/[=]*$/g, '');


    // If file is smaller than max raw file size, create a "raw" entity
    return new Promise<string>((resolve, reject) => {
      if (size <= Constants.MAX_RAW_SIZE) {
        const storeData = (data: ArrayBuffer) => {
          try {
            // means csExp.dumpB(['raw', data]) :
            const sExp = this.createRawShard(data);
            const paddedExp = this.pad(sExp);

            const encryptedData = this.encryptShardEntry(paddedExp, key);

            const xtUrn = this.store.put(encryptedData);
            const xt = xtUrn.split(':')[2];
            resolve(`idsc:p0.${xt}.${b64Key}`);
          } catch (e) {
            reject(e)
          }
        }
        if (isNodeJS) {
          fs.fstat(fd, (err: Error, stats: any) => {
            if (err) { return reject(err) }
            const buffer = new Buffer(stats.size);
            fs.read(fd, buffer, 0, buffer.length, null, (error: Error, bRead: number, buffer: Buffer) => {
              if (error) { return reject(error) }
              storeData(b2ab(buffer))
            });
          })
        } else {
          let fr = new FileReader();
          fr.onerror = () => {
            return reject(new Error(this.canNotLoad))
          }
          fr.onload = () => {
            if (!(fr.result instanceof ArrayBuffer)) {
              return reject(new Error(this.canNotLoad))
            }
            storeData(fr.result)
          }
          fr.readAsArrayBuffer(<File>fd)
        }

      } else {
        return new Promise<string>((resolve, reject) => {
          const xts = [];

          let count = 0;
          let pos = 0;

          // read, put ...
          while (pos <= size) {
            //.py fd.read(Constants.CHUNK_SIZE) :
            let rawData = new ArrayBuffer(size);
            fs.readSync(fd, rawData, pos, Constants.CHUNK_SIZE, null);
            if (rawData.byteLength < Constants.CHUNK_SIZE) {
              rawData = this.pad(rawData)
            }
            const data = this.encryptShardChunk(rawData, key, count);
            const xtUrn = this.store.put(data);
            xts.push(xtUrn)
            count += 1
            pos += Constants.CHUNK_SIZE
          }

          // Finally generate the manifest
          const manifest = this.createManifest(xts, size);
          const paddedManifest = this.pad(manifest);
          const encryptedManifest = this.encryptShardEntry(paddedManifest, key);
          const xtUrn = this.store.put(encryptedManifest);
          const xt = xtUrn.split(':')[2];
          resolve(`idsc:p0.${xt}.${b64Key}`);
        })
      }
    })

  }

  download(urn: string, fd: number | File) {
  /**
   * Download a file from a store
   * Takes a URN and writes the data to the file descriptor
   * @param urn The URN of the file (string)
   * @param fd A file object to write the file to (file-like object)
   * @return
   * Raises:
   * NotImplementedError: If the store does not support the 'get' method
   */

    if (!(this.store.hasOwnProperty('get'))) {
      throw new NotImplementedError(`${this.canNot} GET`);
    }

    const [scheme, payload] = urn.split(':');
    /** @TODO MDSC */
    if (scheme !== 'idsc') {
      throw new NotImplementedError(`${this.canOnly} IDSCs yet`);
    }
    const [encSuite, xt, b64keyPrepad] = payload.split('.');
    if (encSuite !== 'p0') {
      throw new NotImplementedError(`${this.canOnly} encSuite: 'p0'`);
    }
    // TODO (?) framework/String/repeat polyfill for old browsers :
    const pad = '='.repeat(4 - ((b64keyPrepad.length) % 4));
    //.py urlsafe_b64decode :
    const key = urlDecode(b64keyPrepad + pad);
    const xtUrn = `urn:sha256d:${xt}`;

    const encryptedData = this.store.get(xtUrn);
    const decryptedData = this.decryptShardEntry(encryptedData, b(key));
    let data = csExp.loadB(decryptedData);
    if (data[0].toString() === 'raw') {
      /** @TODO FIXME */
      //fd.write(data[1])
      //fd.flush()
      return
    } else if (data[0].toString() === 'manifest') {
      const manifest = this.readManifest(data);
      const [size, ...chunks] = manifest;
      // We need to assemble the pieces
      let i = 0;
      let pos = 0;
      for (let chunk in chunks) {
        const encryptedData = this.store.get(chunk);
        data = this.decryptShardChunk(encryptedData, b(key), i);
        pos += Constants.CHUNK_SIZE;

        /** @TODO FIXME */
        if (pos > size) {
          //fd.write(data[:size % CHUNK_SIZE])
          //fd.flush()
        } else {
          //fd.write(data)
          //fd.flush()
        }
        i += 1;
      }
    }
  }

  private generateKey(length: number = Constants.KEY_SIZE) {
  /**
   * Generate a random key of length
	 * @param length The size of the key (int)
	 * @return The random key (string)
	 */
    return forge.random.getBytesSync(length) // was Crypto.randomBytes(length)
  }

  private createIV(key: ArrayBuffer, prefix: 'entry-point'|'content', count: number = 0): ArrayBuffer {
  /**
   * Make the initialization vector for encryption/decryption
	 * @param key The symmetrical key (bytes)
   * @param prefix The prefix to use ("entry-point" | "content")
   * @param count The counter, defaults to 0 (int)
	 * @return The initialization vector in bytes (bytes)
	 */
    /** @TODO .py : "This needs to switch to appending together bytes" */
    const raw = `${prefix}${count}${key}`;
    return bAppend(b(raw), forge.random.getBytesSync(Constants.KEY_SIZE))
  }

  private createCipherIV(key: ArrayBuffer, prefix: 'entry-point'|'content', count: number = 0) {
    const cipher = forge.cipher.createCipher('AES-CTR', key);
    cipher.start({iv: this.createIV(key, prefix, count)});
    return cipher
    //return cr.createCipheriv('aes-256-ctr', ...this.createIV(key, prefix, count))
  }
  private createDecipherIV(key: ArrayBuffer, prefix: 'entry-point'|'content', count: number = 0) {
    const decipher = forge.cipher.createDecipher('AES-CTR', key);
    decipher.start({iv: this.createIV(key, prefix, count)});
    return decipher
    //return cr.createDecipheriv('aes-256-ctr', ...this.createIV(key, prefix, count))
  }

  private encryptShardEntry(data: ArrayBuffer, key: ArrayBuffer) {
  /**
   * Encrypt a raw file
	 * @param data The data to be encrypted (bytes)
   * @param key The symmetrical key (bytes)
	 * @return The encrypted data (bytes)
	 */
    const iv = this.createCipherIV(key, 'entry-point');
    iv.update(new forge.util.ByteBuffer(data)) && iv.finish();
    return iv.output
    // was `${iv.update(data, 'binary', 'binary')}${iv.final('binary')}`
  }

  private decryptShardEntry(data: any, key: ArrayBuffer) {
  /**
   * Decrypt an entry shard file
   * @param data The data to be decrypted (bytes)
   * @param key The symmetrical key (bytes)
	 * @return The decrypted data (bytes)
	 */
    const iv = this.createDecipherIV(key, 'entry-point');
    iv.update(new forge.util.ByteBuffer(data)) && iv.finish();
    return iv.output;
    // was `${iv.update(data, 'binary', 'binary')}${iv.final('binary')}`
  }

  private encryptShardChunk(data: ArrayBuffer, key: ArrayBuffer, count: number) {
  /**
   * Encrypt a file chunk
   * @param data The data to be encrypted (bytes)
   * @param key The symmetrical key (bytes)
   * @param count The block count (int)
	 * @return The encrypted data (bytes)
	 */
    const iv = this.createCipherIV(key, 'content', count);
    iv.update(new forge.util.ByteBuffer(data)) && iv.finish();
    return iv.output
    // was `${iv.update(data, 'binary', 'binary')}${iv.final('binary')}`
  }

  private decryptShardChunk(data: ArrayBuffer, key: ArrayBuffer, count: number) {
  /**
   * Decrypt a file chunk
   * @param data The data to be decrypted (bytes)
   * @param key The symmetrical key (bytes)
   * @param count The block count (int)
	 * @return The decrypted data (bytes)
	 */
    const iv = this.createDecipherIV(key, 'content', count);
    iv.update(new forge.util.ByteBuffer(data)) && iv.finish();
    return iv.output
    // was `${iv.update(data, 'binary', 'binary')}${iv.final('binary')}`
  }

  private createManifest(xts: any[], size: number) {
  /**
   * Create a manifest
	 * @param xts ??? A list of the URNS for the chunks (array)
   * @param size The size (int)
	 * @return The raw (unencrypted) manifest (bytes)
	 */
    //
    const manifest = csExp.dumpB(['manifest', size].concat(xts));
    if (manifest.byteLength > Constants.MAX_RAW_SIZE) {
      throw new NotImplementedError('Manifest too large')
    }
    return manifest

  }

  private pad(data: ArrayBuffer, size = Constants.CHUNK_SIZE): ArrayBuffer {
    // TODO FIXME
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/transfer

  /**
   * Pad data to 32k
	 * @param data The data to pad (bytes)
   * @param size The size of the destination (int)
	 * @return The padded data (bytes)
	 */
    // Buffer.concat; // TODO - CHECK IN BROWSER
    return bAppend(data, (new ArrayBuffer(size - data.byteLength)));
    //.py data + (b'\0' * (size - data.length))
  }

  private readManifest(mlist: any[]) {
  /**
   * Takes in a manifest list and coerces the correct data structures from it
	 * @param mlist The manifest in list form (array)
	 * @return A usable manifest list (array)
	 */
    // .py TODO :
    /* manifest = [mlist[0].decode(), int(mlist[1])]
      xts = [i.decode() for i in mlist[2:]]
      manifest = manifest + xts
      return manifest
    */
    const xts = mlist.slice(2);
    const manifest = [`${mlist[0]}`, parseInt(mlist[1], 10), ...xts];
    return manifest;

  }

  private createRawShard(data: ArrayBuffer) {
  /**
   * Create a raw shard
	 * @param data The data (bytes)
	 * @return The data as a Data Shard raw entity (bytes)
	 */
    //['raw', data];
    return csExp.dumpB(bAppend(b('raw'), data))
  }
}
