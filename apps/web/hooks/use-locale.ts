"use client"

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

interface UseLocaleReturn {
    locale: string
    isRTL: boolean
}

export function useLocale(): UseLocaleReturn {
    const pathname = usePathname()
    const [locale, setLocale] = useState<string>('en')
    const [isRTL, setIsRTL] = useState<boolean>(false)

    useEffect(() => {
        // Get locale from pathname or localStorage or any other source
        let detectedLocale = 'en'

        // Example: Check if pathname starts with /ar/ for Arabic
        if (pathname?.startsWith('/ar/')) {
            detectedLocale = 'ar'
        } else if (typeof window !== 'undefined') {
            // Check localStorage or HTML lang attribute
            const htmlLang = document.documentElement.lang
            if (htmlLang) {
                detectedLocale = htmlLang
            }

            // Fallback to browser language
            if (!detectedLocale) {
                detectedLocale = navigator.language.split('-')[0]
            }
        }

        setLocale(detectedLocale)

        // RTL languages
        const rtlLanguages = ['ar', 'he', 'fa', 'ur']
        setIsRTL(rtlLanguages.includes(detectedLocale))
    }, [pathname])

    return { locale, isRTL }
}