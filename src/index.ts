export class Cipher {
  // Convert Uint8Array to bit array
  private static toBitArray(bytes: Uint8Array): number[] {
    const bits: number[] = [];
    for (const b of bytes) {
      for (let i = 7; i >= 0; i--) bits.push((b >> i) & 1);
    }
    return bits;
  }

  // Convert bit array back to Uint8Array
  private static fromBitArray(bits: number[]): Uint8Array {
    const len = bits.length / 8;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      let v = 0;
      for (let j = 0; j < 8; j++) v = (v << 1) | bits[i*8 + j];
      bytes[i] = v;
    }
    return bytes;
  }

  // Rotate left by shift bits
  private static rotate(bits: number[], shift: number): number[] {
    const n = bits.length;
    const s = shift % n;
    return bits.slice(s).concat(bits.slice(0, s));
  }

  // Encode numeric key to string of a/b/c tokens
  private static encodeKey(k: number): string {
    const map: [string, number][] = [ ['C',6], ['B',4], ['c',3], ['A',2], ['b',2], ['a',1] ];
    const parts: string[] = [];
    let rem = k;
    while (rem > 0) {
      for (const [token, val] of map) {
        if (val <= rem) {
          parts.push(token);
          rem -= val;
          break;
        }
      }
    }
    return parts.join('');
  }

  // Decode string key back to numeric
  private static decodeKey(keyStr: string): number {
    let total = 0;
    for (const ch of keyStr) {
      const base = ['a','b','c'].indexOf(ch.toLowerCase()) + 1;
      total += ch === ch.toUpperCase() ? base * 2 : base;
    }
    return total;
  }

  /**
   * Encrypt plaintext to alphanumeric-only ciphertext with string key
   * @param text Plaintext input
   */
  public static encrypt(text: string): { cipher: string; key: string } {
    const enc = new TextEncoder();
    const dec = new TextDecoder();
    const bits = Cipher.toBitArray(enc.encode(text));
    let keyNum = text.length;
    let out = '';
    // rotate until alphanumeric-only
    while (true) {
      const b = Cipher.rotate(bits, keyNum);
      out = dec.decode(Cipher.fromBitArray(b));
      if (/^[A-Za-z0-9]+$/.test(out)) break;
      keyNum++;
    }
    const keyStr = Cipher.encodeKey(keyNum);
    return { cipher: out, key: keyStr };
  }

  /**
   * Decrypt ciphertext using string key
   * @param cipher Alphanumeric ciphertext
   * @param key String key encoding rotations
   */
  public static decrypt(cipher: string, key: string): string {
    const enc = new TextEncoder();
    const dec = new TextDecoder();
    const bits = Cipher.toBitArray(enc.encode(cipher));
    const keyNum = Cipher.decodeKey(key);
    const n = bits.length;
    const shift = (n - (keyNum % n)) % n;
    const origBits = Cipher.rotate(bits, shift);
    return dec.decode(Cipher.fromBitArray(origBits));
  }
}