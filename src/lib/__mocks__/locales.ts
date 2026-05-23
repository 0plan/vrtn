// Manual mock for the locales module to avoid import.meta.env issues
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import yaml from 'js-yaml';

// Mock the actual initialization to avoid import.meta.env issues
const mockInit = jest.fn();

// Use a mock implementation of the i18n setup that doesn't use import.meta
i18n.use = jest.fn().mockReturnThis();
i18n.init = mockInit;

// Initialize with mocked values
i18n.use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}.yml',
      parse(data: string) {
        return yaml.load(data);
      },
    },
  });

export default i18n;