import { Cipher } from '../src/index';

test('roundtrip encrypt/decrypt', () => {
  const key = 'AbCDEfGh';
  const text = 'Hello, World!';
  const encrypted = Cipher.encrypt(text, key);
  expect(Cipher.decrypt(encrypted, key)).toBe(text);
});