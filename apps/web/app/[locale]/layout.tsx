import { ThemeProvider } from "@/components/context/theme-provider"
import { Toaster } from "@/components/library/sonner"
import Providers from "@/components/Providers"
import { routing } from '@/i18n/routing'
import { Settings } from "@/lib/meta"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from "next/navigation"
import { Fragment } from "react"
import "@/styles/globals.css"
import "@/styles/prism-theme.css"

const baseUrl = Settings.metadataBase

export const metadata: Metadata = {
  title: Settings.title,
  metadataBase: new URL(baseUrl),
  description: Settings.description,
  keywords: Settings.keywords,
  openGraph: {
    type: Settings.openGraph.type,
    url: baseUrl,
    title: Settings.openGraph.title,
    description: Settings.openGraph.description,
    siteName: Settings.openGraph.siteName,
    images: Settings.openGraph.images.map((image) => ({
      ...image,
      url: `${baseUrl}${image.url}`,
    })),
  },
  twitter: {
    card: Settings.twitter.card,
    title: Settings.twitter.title,
    description: Settings.twitter.description,
    site: Settings.twitter.site,
    images: Settings.twitter.images.map((image) => ({
      ...image,
      url: `${baseUrl}${image.url}`,
    })),
  },
  alternates: {
    canonical: baseUrl,
  },
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={cn(
          "font-[-apple-system,BlinkMacSystemFont,system-ui,'Segoe_UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open_Sans','Helvetica_Neue',sans-serif]",
          "bg-background font-medium antialiased min-h-svh"
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <div vaul-drawer-wrapper="">
            <div className="relative flex min-h-svh flex-col bg-background">
              <Providers>
                <NextIntlClientProvider>
                  {children}
                </NextIntlClientProvider>
              </Providers>
            </div>
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
