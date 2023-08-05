import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { validateSingleArgs } from './validateSingleArgs';

describe('When the process runs without any args', () => {
  let response: string | undefined;
  beforeEach(() => {
    process.argv = ['node', 'index.js'];
    response = validateSingleArgs();
  });

  it('should return an error message', () => {
    expect(response).toBe('Please provide a single file path argument');
  });
});

describe('When the process runs with more than one arg', () => {
  let response: string | undefined;
  beforeEach(() => {
    process.argv = ['node', 'index.js', 'foo', 'bar'];
    response = validateSingleArgs();
  });

  it('should return an error message', () => {
    expect(response).toBe('Please provide a single file path argument');
  });
});

describe('When the process runs with a single arg', () => {
  let response: string | undefined;
  beforeEach(() => {
    process.argv = ['node', 'index.js', 'foo'];
    response = validateSingleArgs();
  });

  it('should return undefined', () => {
    expect(response).toBeUndefined();
  });
});
