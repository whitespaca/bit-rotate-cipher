# bit-rotate-cipher

A lightweight TypeScript library for encrypting strings into alphanumeric-only ciphertext by bit-rotating until valid, and decrypting using the returned rotation key (string-encoded).

## Installation

```bash
npm install bit-rotate-cipher
```

## Usage

```typescript
import { Cipher } from 'bit-rotate-cipher';

// Encrypt: returns ciphertext and key (string)
const { cipher, key } = Cipher.encrypt('HelloWorld');
// Decrypt: supply ciphertext and key
const plaintext = Cipher.decrypt(cipher, key);

console.log('Ciphertext:', cipher);
console.log('Key:', key);
console.log('Plaintext:', plaintext);
```

## API

- `Cipher.encrypt(text: string): { cipher: string; key: string }`  
  Rotates bits by initial shift = `text.length`, then continues rotating by increments of 1 until resulting decoded string is alphanumeric-only. Returns `{ cipher, key }` where `key` encodes total rotations as a string of `a`, `b`, `c` (lowercase = value, uppercase = double value).

- `Cipher.decrypt(cipher: string, key: string): string`  
  Parses `key` string back to numeric rotation count, performs inverse rotation to recover original text.

## Testing

```bash
npm run test
```

## License
MIT