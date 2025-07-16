# Function Usage

## Cipher.encrypt(text: string, key: string)

Encrypts the given plaintext using the provided key (count of uppercase letters) and returns the ciphertext.

```typescript
import { Cipher } from 'bit-rotate-cipher';

const key = 'MySecretKEY';          // 4 uppercase letters → shift = 4
const plaintext = 'Hello, World!';
const ciphertext = Cipher.encrypt(plaintext, key);
console.log('Encrypted:', ciphertext);
```

- **Shift Calculation**: Counts uppercase letters in the key string.
- **Encryption Process**: UTF-8 encoding → Bit array conversion → Rotate left → Byte reassembly → UTF-8 decoding

---

## Cipher.decrypt(text: string, key: string)

Decrypts the given ciphertext using the provided key and returns the original plaintext.

```typescript
import { Cipher } from 'bit-rotate-cipher';

const decrypted = Cipher.decrypt(ciphertext, key);
console.log('Decrypted:', decrypted); // 'Hello, World!'
```

- **Decryption Process**: UTF-8 encoding → Bit array conversion → Rotate right → Byte reassembly → UTF-8 decoding

---

> **Note**: Both `encrypt` and `decrypt` methods use the same internal steps (`getShift`, `toBitArray`, `rotate`, `fromBitArray`). As long as the key is consistent, decryption perfectly reverses encryption.
