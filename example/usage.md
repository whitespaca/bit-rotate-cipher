# Function Usage

## Cipher.encrypt(text: string)
Encrypts a plaintext string by bit-rotating until result is alphanumeric-only. Returns:

```ts
const { cipher, key } = Cipher.encrypt('HelloWorld');
// e.g. cipher = 'X9Ab2', key = 'Cba'
```

- **Initial shift**: `text.length`
- **Loop**: rotate by current numeric key until `/^[A-Za-z0-9]+$/`
- **Key encoding**: numeric key → string via tokens: `a`=1, `b`=2, `c`=3; uppercase doubles value.

## Cipher.decrypt(cipher: string, key: string)
Decrypts using string key:

```ts
const plaintext = Cipher.decrypt(cipher, key);
// returns 'HelloWorld'
```

> **Note**: Key string encodes total rotations; decryption reverses rotation to recover original.