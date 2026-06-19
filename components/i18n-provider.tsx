"use client"

import React, { ReactNode, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n'

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // ensure client-side language detector runs and i18n is ready
    // i18n is initialized in lib/i18n which imports JSON resources
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
