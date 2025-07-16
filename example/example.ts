import { Cipher } from 'bit-rotate-cipher';

const { cipher, key } = Cipher.encrypt('HelloWorld');
console.log('Cipher:', cipher);
console.log('Key   :', key);

const original = Cipher.decrypt(cipher, key);
console.log('Decoded:', original);
