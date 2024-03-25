import {
  useIsomorphicLayoutEffect,
  useLocalStorage,
  useMediaQuery,
} from 'usehooks-ts';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';
const LOCAL_STORAGE_KEY = 'usehooks-ts-dark-mode';

type DarkModeOptions = {
  defaultValue?: boolean
  localStorageKey?: string
  initializeWithValue?: boolean
}

type DarkModeReturn = {
  isDarkMode: boolean
  toggle: () => void
  enable: () => void
  disable: () => void
  set: (value: boolean) => void
}

export function useDarkMode(options: DarkModeOptions = {}): DarkModeReturn {
  const {
    defaultValue,
    localStorageKey = LOCAL_STORAGE_KEY,
    initializeWithValue = true,
  } = options;

  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY, {
    initializeWithValue,
    defaultValue,
  });
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    localStorageKey,
    defaultValue ?? isDarkOS ?? false,
    { initializeWithValue },
  );

  // Update darkMode if os prefers changes
  useIsomorphicLayoutEffect(() => {
    setDarkMode(isDarkOS);
  }, [isDarkOS]);
  useIsomorphicLayoutEffect(() => {
    if (isDarkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [isDarkMode]);

  return {
    isDarkMode,
    toggle: () => {
      setDarkMode((prev) => !prev);
    },
    enable: () => {
      setDarkMode(true);
    },
    disable: () => {
      setDarkMode(false);
    },
    set: (value) => {
      setDarkMode(value);
    },
  };
}
