# bit-rotate-cipher

A lightweight TypeScript library for encrypting and decrypting strings by rotating bits based on uppercase letter count in a key.

## Installation

```bash
npm install bit-rotate-cipher
```

## Usage

```typescript
import { Cipher } from 'bit-rotate-cipher';

const key = 'AbCDEfGh'; // 5 uppercase letters
const text = 'Hello, World!';

const encrypted = Cipher.encrypt(text, key);
const decrypted = Cipher.decrypt(encrypted, key);

console.log('Encrypted:', encrypted);
console.log('Decrypted:', decrypted);
```

## API

- `Cipher.encrypt(text: string, key: string): string` — Encrypts the given text.
- `Cipher.decrypt(text: string, key: string): string` — Decrypts the given text.

## License

MIT
