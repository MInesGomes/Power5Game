"use client"

import React, { ReactNode, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n'

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem('power5-state-v1')
      if (raw) {
        const parsed = JSON.parse(raw) as { language?: string }
        if (parsed?.language) {
          void i18n.changeLanguage(parsed.language)
          return
        }
      }
      const browserLang = navigator.language?.split('-')[0]
      if (browserLang && ['en', 'pt', 'nl'].includes(browserLang)) {
        void i18n.changeLanguage(browserLang)
      }
    } catch {
      /* ignore */
    }
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
