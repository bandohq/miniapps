import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import es from "./es";

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof en;
  }
}

const resources = {
  en,
  es,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
  react: {
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    bindI18n: 'languageChanged loaded',
    bindI18nStore: 'added removed',
    nsMode: 'default',
  },
});

i18n.services.formatter?.add('capitalize', (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
});

export default i18n;
