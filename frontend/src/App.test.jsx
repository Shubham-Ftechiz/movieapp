import { render, screen } from '@testing-library/react';
import App from './App';

import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('renders headline', () => {
    return (<App />);
  });
});

// example test

/*   import { expect, test } from 'vitest';
  function sum(a, b) {
    return a + b;
  }
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  }) */