import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend) // JSON faylları yükləmək üçün
    .use(LanguageDetector) // Brauzer dilini avtomatik müəyyən etmək üçün
    .use(initReactI18next)
    .init({
        fallbackLng: 'az',
        debug: true, // Konsolda debug məlumatlarını görmək üçün
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json' // JSON fayl yolları
        }
    });

export default i18n;