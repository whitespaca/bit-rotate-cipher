import { Cipher } from 'bit-rotate-cipher';

const key = 'MySecretKEY';
const message = 'Bit rotation encryption example';

const encrypted = Cipher.encrypt(message, key);
console.log('Encrypted:', encrypted);

const decrypted = Cipher.decrypt(encrypted, key);
console.log('Decrypted:', decrypted);