import { isString, isDefined } from './typecheck';

test('isDefined', () => {
  expect(isDefined('')).toBe(true);
  expect(isDefined(undefined)).toBe(false);
  expect(isDefined(true)).toBe(true);
  expect(isDefined(false)).toBe(true);
  expect(isDefined({})).toBe(true);
  expect(isDefined('asdfasdfa')).toBe(true);
});

test('isString', () => {
  expect(isString('')).toBe(true);
  expect(isString('asdfasdfa')).toBe(true);
  expect(isString(undefined)).toBe(false);
  expect(isString(true)).toBe(false);
  expect(isString(false)).toBe(false);
  expect(isString({})).toBe(false);
});
