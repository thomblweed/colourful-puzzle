import { describe, expect, it } from 'vitest';

import { addNumbers } from './index';

describe('addNumbers', () => {
  it('should add two numbers', () => {
    expect(addNumbers(1, 2)).toEqual(3);
  });
});
