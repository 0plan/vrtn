import yaml from 'js-yaml';
import { expect, test } from 'vitest';

const dictionaries = import.meta.glob<string>('/public/locales/*/*.yml', {
  eager: true, query: '?raw', import: 'default',
});

function dictionaryShape(language: string) {
  const prefix = `/public/locales/${language}/`;
  const files = Object.entries(dictionaries).filter(([path]) => path.startsWith(prefix));
  expect(files.length).toBeGreaterThan(0);
  return Object.fromEntries(files.map(([path, raw]) => {
    const file = path.slice(prefix.length);
    const messages = yaml.load(raw) as Record<string, string>;
    const keys = Object.entries(messages).map(([key, value]) => {
      expect(value, `${language}/${file}: ${key}`).toBeTypeOf('string');
      expect(value.trim()).not.toBe('');
      return [key, (value.match(/{{[^}]+}}/g) ?? []).sort()];
    });
    return [file, Object.fromEntries(keys)];
  }));
}

test('each language provides the same pages, keys and interpolation variables', () => {
  const english = dictionaryShape('en');
  expect(dictionaryShape('ko')).toEqual(english);
});
