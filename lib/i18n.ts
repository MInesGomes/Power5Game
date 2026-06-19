import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../public/locales/en/translation.json'
import pt from '../public/locales/pt/translation.json'
import nl from '../public/locales/nl/translation.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      nl: { translation: nl },
    },
    lng: 'en',
    fallbackLng: 'en',
    initImmediate: false,
    interpolation: { escapeValue: false },
  })

export default i18n
