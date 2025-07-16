export class Cipher {
  /**
   * Calculate shift amount from uppercase letters in key
   * @param key The key string
   * @returns Number of uppercase letters in the key
   */
  private static getShift(key: string): number {
    return (key.match(/[A-Z]/g) || []).length;
  }

  /**
   * Convert bytes to a flat bit array
   * @param bytes The input Uint8Array
   * @returns An array of bits (0 or 1)
   */
  private static toBitArray(bytes: Uint8Array): number[] {
    const bits: number[] = [];
    for (const byte of bytes) {
      for (let i = 7; i >= 0; i--) {
        bits.push((byte >> i) & 1);
      }
    }
    return bits;
  }

  /**
   * Convert a flat bit array back to bytes
   * @param bits Array of bits (length divisible by 8)
   * @returns Uint8Array reconstructed from bits
   */
  private static fromBitArray(bits: number[]): Uint8Array {
    const bytes = new Uint8Array(bits.length / 8);
    for (let i = 0; i < bytes.length; i++) {
      let val = 0;
      for (let j = 0; j < 8; j++) {
        val = (val << 1) | bits[i * 8 + j];
      }
      bytes[i] = val;
    }
    return bytes;
  }

  /**
   * Rotate bits left (encrypt) or right (decrypt)
   * @param bits The bit array
   * @param shift The rotation amount
   * @param encrypt True for left rotation, false for right
   * @returns Rotated bit array
   */
  private static rotate(bits: number[], shift: number, encrypt: boolean): number[] {
    const total = bits.length;
    if (shift === 0 || total === 0) return bits;
    const s = shift % total;
    if (encrypt) {
      return bits.slice(s).concat(bits.slice(0, s));
    } else {
      return bits.slice(total - s).concat(bits.slice(0, total - s));
    }
  }

  /**
   * Encrypt the text using bit rotation
   * @param text The plaintext to encrypt
   * @param key  The key for determining rotation
   * @returns The encrypted ciphertext
   */
  public static encrypt(text: string, key: string): string {
    const shift = Cipher.getShift(key);
    if (shift === 0) return text;
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const bytes = encoder.encode(text);
    const bits = Cipher.toBitArray(bytes);
    const rotated = Cipher.rotate(bits, shift, true);
    const outBytes = Cipher.fromBitArray(rotated);
    return decoder.decode(outBytes);
  }

  /**
   * Decrypt the text using bit rotation
   * @param text The ciphertext to decrypt
   * @param key  The key for determining rotation
   * @returns The decrypted plaintext
   */
  public static decrypt(text: string, key: string): string {
    const shift = Cipher.getShift(key);
    if (shift === 0) return text;
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const bytes = encoder.encode(text);
    const bits = Cipher.toBitArray(bytes);
    const rotated = Cipher.rotate(bits, shift, false);
    const outBytes = Cipher.fromBitArray(rotated);
    return decoder.decode(outBytes);
  }
}