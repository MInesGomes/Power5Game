import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import type { InitOptions } from 'i18next'
import en from '../public/locales/en/translation.json'
import pt from '../public/locales/pt/translation.json'
import nl from '../public/locales/nl/translation.json'

const resources = {
  en: { translation: en },
  pt: { translation: pt },
  nl: { translation: nl },
}

const options: InitOptions = {
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
}

i18n.use(initReactI18next).init(options)

export default i18n
