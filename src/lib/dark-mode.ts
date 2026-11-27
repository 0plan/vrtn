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
  const [preference, setDarkMode] = useLocalStorage<boolean | null>(
    localStorageKey,
    null,
    { initializeWithValue },
  );
  const isDarkMode = preference ?? defaultValue ?? isDarkOS;

  useIsomorphicLayoutEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    document.body.dataset.colorMode = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  return {
    isDarkMode,
    toggle: () => {
      setDarkMode(!isDarkMode);
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
