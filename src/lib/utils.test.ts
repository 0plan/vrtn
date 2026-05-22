import { cn } from './utils';

describe('cn utility function', () => {
  test('should merge class names correctly', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  test('should handle conditional classes', () => {
    const result = cn('class1', false && 'class2', 'class3');
    expect(result).toBe('class1 class3');
  });

  test('should handle object notation', () => {
    const result = cn('class1', { class2: true, class3: false }, 'class4');
    expect(result).toBe('class1 class2 class4');
  });

  test('should handle array notation', () => {
    const result = cn('class1', ['class2', 'class3'], 'class4');
    expect(result).toBe('class1 class2 class3 class4');
  });

  test('should merge Tailwind classes with conflicts', () => {
    // tailwind-merge should handle conflicting Tailwind classes
    const result = cn('text-red-500', 'text-blue-500');
    expect(result).toBe('text-blue-500');
  });

  test('should handle null and undefined values', () => {
    const result = cn('class1', null, 'class2', undefined, 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  test('should merge multiple conflicting Tailwind classes', () => {
    const result = cn('p-4', 'p-2', 'm-4', 'm-2');
    expect(result).toBe('p-2 m-2');
  });

  test('should handle mixed input types', () => {
    const result = cn(
      'class1',
      { class2: true, class3: false },
      ['class4', 'class5'],
      null,
      undefined,
      false && 'class6',
      'class7'
    );
    expect(result).toBe('class1 class2 class4 class5 class7');
  });

  test('should return empty string when no inputs provided', () => {
    const result = cn();
    expect(result).toBe('');
  });
});