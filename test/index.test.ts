import { Cipher } from '../src/index';

test('encrypt-decrypt roundtrip with string key', () => {
  const { cipher, key } = Cipher.encrypt('Test123');
  const decoded = Cipher.decrypt(cipher, key);
  expect(decoded).toBe('Test123');
  expect(/^[aAbBcC]+$/.test(key)).toBe(true);
});