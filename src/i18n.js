import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import {
  format as formatDate,
  formatRelative,
  formatDistance,
  isDate
} from "date-fns";

import { enUS, fr, de } from "date-fns/locale";

import './index.css';


const locales = { enUS, fr, de };

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['fr', 'en', 'de'],
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    fallbackLng: "en",
    detection: {
      order: ['cookie', 'htmlTag', 'querystring', 'localStorage', 'sessionStorage', 'navigator', 'path', 'subdomain'],
      caches: ['cookies']
    },
    backend: {
      loadPath: 'assets/locales/{{lng}}/translation.json'
    },
    interpolation: {
        // react already saves from xss
        escapeValue: false,

        format: (value, format, lng) => {
            if (isDate(value)) {
                const locale = locales[lng];

                if (format === "short")
                    return formatDate(value, "P", { locale });
                if (format === "long")
                    return formatDate(value, "PPPP", { locale });
                if (format === "relative")
                    return formatRelative(value, new Date(), { locale });
                if (format === "ago")
                    return formatDistance(value, new Date(), {
                        locale,
                        addSuffix: true
                    });

                return formatDate(value, format, { locale });
            }

            return value;
        }
    },
    react: {
      useSuspense: false
    }
  });
