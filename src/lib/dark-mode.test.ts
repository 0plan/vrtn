import { renderHook, act } from '@testing-library/react';
import { useDarkMode } from './dark-mode';

// Create classListMock at the top level so it's accessible in tests
const classListMock = {
  add: jest.fn(),
  remove: jest.fn(),
  contains: jest.fn(),
  toggle: jest.fn(),
  replace: jest.fn(),
  entries: jest.fn(),
  forEach: jest.fn(),
  item: jest.fn(),
  values: jest.fn(),
};

// Ensure DOM is available before setting up mocks
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  // Ensure document.body exists in JSDOM environment
  if (!document.body) {
    Object.defineProperty(document, 'body', {
      value: { classList: classListMock },
      writable: true,
    });
  } else {
    Object.defineProperty(document.body, 'classList', {
      value: classListMock,
      writable: true,
    });
  }
}

// Mock the usehooks-ts module to control the behavior of the hooks
jest.mock('usehooks-ts', () => ({
  useMediaQuery: jest.fn(() => false),
  useLocalStorage: jest.fn(),
  useIsomorphicLayoutEffect: jest.fn((fn) => fn()),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Import the mocked modules after setting up mocks
const { useMediaQuery, useLocalStorage, useIsomorphicLayoutEffect } = require('usehooks-ts');

describe('useDarkMode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (localStorageMock.getItem as jest.Mock).mockReturnValue(null);
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    (useLocalStorage as jest.Mock).mockImplementation(
      (key: string, initialValue: any) => {
        const storedValue = localStorageMock.getItem(key);
        const value = storedValue !== null ? JSON.parse(storedValue) : initialValue;
        return [value, jest.fn()];
      }
    );
  });

  describe('initialization', () => {
    it('should initialize with default value when no options are provided', () => {
      const { result } = renderHook(() => useDarkMode());
      
      expect(result.current.isDarkMode).toBe(false);
    });

    it('should initialize with defaultValue option', () => {
      const { result } = renderHook(() => useDarkMode({ defaultValue: true }));
      
      expect(result.current.isDarkMode).toBe(true);
    });

    it('should initialize with localStorage value if available', () => {
      (localStorageMock.getItem as jest.Mock).mockReturnValue(JSON.stringify(true));
      
      const { result } = renderHook(() => useDarkMode());
      
      expect(result.current.isDarkMode).toBe(true);
    });

    it('should initialize with OS preference if no localStorage value and no defaultValue', () => {
      (useMediaQuery as jest.Mock).mockReturnValue(true);
      
      const { result } = renderHook(() => useDarkMode());
      
      expect(result.current.isDarkMode).toBe(true);
    });

    it('should use custom localStorage key if provided', () => {
      const customKey = 'my-custom-dark-mode-key';
      renderHook(() => useDarkMode({ localStorageKey: customKey }));
      
      expect(localStorageMock.getItem).toHaveBeenCalledWith(customKey);
    });
  });

  describe('toggle function', () => {
    it('should toggle dark mode from false to true', () => {
      const setDarkModeMock = jest.fn();
      (useLocalStorage as jest.Mock).mockReturnValue([false, setDarkModeMock]);

      const { result } = renderHook(() => useDarkMode());

      act(() => {
        result.current.toggle();
      });

      // Since the toggle function uses a callback (prev => !prev), we need to check the call
      expect(setDarkModeMock).toHaveBeenCalled();
      const callback = setDarkModeMock.mock.calls[0][0];
      if (typeof callback === 'function') {
        expect(callback(false)).toBe(true);
      }
    });

    it('should toggle dark mode from true to false', () => {
      const setDarkModeMock = jest.fn();
      (useLocalStorage as jest.Mock).mockReturnValue([true, setDarkModeMock]);

      const { result } = renderHook(() => useDarkMode());

      act(() => {
        result.current.toggle();
      });

      // Since the toggle function uses a callback (prev => !prev), we need to check the call
      expect(setDarkModeMock).toHaveBeenCalled();
      const callback = setDarkModeMock.mock.calls[0][0];
      if (typeof callback === 'function') {
        expect(callback(true)).toBe(false);
      }
    });
  });

  describe('enable function', () => {
    it('should enable dark mode', () => {
      const setDarkModeMock = jest.fn();
      (useLocalStorage as jest.Mock).mockReturnValue([false, setDarkModeMock]);
      
      const { result } = renderHook(() => useDarkMode());
      
      act(() => {
        result.current.enable();
      });
      
      expect(setDarkModeMock).toHaveBeenCalledWith(true);
    });
  });

  describe('disable function', () => {
    it('should disable dark mode', () => {
      const setDarkModeMock = jest.fn();
      (useLocalStorage as jest.Mock).mockReturnValue([true, setDarkModeMock]);
      
      const { result } = renderHook(() => useDarkMode());
      
      act(() => {
        result.current.disable();
      });
      
      expect(setDarkModeMock).toHaveBeenCalledWith(false);
    });
  });

  describe('set function', () => {
    it('should set dark mode to true', () => {
      const setDarkModeMock = jest.fn();
      (useLocalStorage as jest.Mock).mockReturnValue([false, setDarkModeMock]);
      
      const { result } = renderHook(() => useDarkMode());
      
      act(() => {
        result.current.set(true);
      });
      
      expect(setDarkModeMock).toHaveBeenCalledWith(true);
    });

    it('should set dark mode to false', () => {
      const setDarkModeMock = jest.fn();
      (useLocalStorage as jest.Mock).mockReturnValue([true, setDarkModeMock]);
      
      const { result } = renderHook(() => useDarkMode());
      
      act(() => {
        result.current.set(false);
      });
      
      expect(setDarkModeMock).toHaveBeenCalledWith(false);
    });
  });

  describe('DOM updates', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      classListMock.add.mockClear();
      classListMock.remove.mockClear();
    });

    it('should add "dark" class to body when dark mode is enabled', () => {
      (useLocalStorage as jest.Mock).mockReturnValue([true, jest.fn()]);
      
      renderHook(() => useDarkMode());
      
      expect(classListMock.add).toHaveBeenCalledWith('dark');
      expect(classListMock.remove).not.toHaveBeenCalled();
    });

    it('should remove "dark" class from body when dark mode is disabled', () => {
      (useLocalStorage as jest.Mock).mockReturnValue([false, jest.fn()]);
      
      renderHook(() => useDarkMode());
      
      expect(classListMock.remove).toHaveBeenCalledWith('dark');
      expect(classListMock.add).not.toHaveBeenCalled();
    });
  });
});