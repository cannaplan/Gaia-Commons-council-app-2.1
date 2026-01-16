import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en.json';
import es from '../locales/es.json';
import so from '../locales/so.json';
import hmn from '../locales/hmn.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  so: { translation: so },
  hmn: { translation: hmn }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali' },
  { code: 'hmn', name: 'Hmong', nativeName: 'Hmoob' }
];
