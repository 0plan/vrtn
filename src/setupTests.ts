// jest-dom adds custom jest matchers for asserting on DOM nodes
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill TextEncoder for Node.js environment
if (typeof TextEncoder === "undefined") {
  const { TextEncoder } = require("util");
  (global as any).TextEncoder = TextEncoder;
}

// Mock the scrollIntoView method which is not available in jsdom
Element.prototype.scrollIntoView = jest.fn();

// Mock ResizeObserver which might not be available in jsdom
window.ResizeObserver = window.ResizeObserver || jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Suppress React key warnings as they are not test errors but common warnings during testing
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args && args[0] && typeof args[0] === 'string' &&
      (args[0].includes('Warning: Each child in a list should have a unique "key" prop') ||
       args[0].includes('Warning: Failed prop type') ||
       args[0].includes('DialogContent` requires a `DialogTitle') ||
       args[0].includes('Missing `Description` or `aria-describedby') ||
       args[0].includes('value` prop to a form field without an `onChange` handler'))) {
    // Suppress React specific warnings that aren't actual test errors
    return;
  }
  originalConsoleError(...args);
};

// Also suppress React accessibility warnings that appear as console warnings
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (args && args[0] && typeof args[0] === 'string' &&
      (args[0].includes('DialogContent` requires a `DialogTitle') ||
       args[0].includes('Missing `Description` or `aria-describedby') ||
       args[0].includes('value` prop to a form field without an `onChange` handler'))) {
    // Suppress React accessibility warnings that aren't actual test errors
    return;
  }
  originalConsoleWarn(...args);
};