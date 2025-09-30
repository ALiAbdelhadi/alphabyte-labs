import { ThemeProvider } from "@/components/context/theme-provider"
import Providers from "@/components/Providers"
import { Toaster } from "@/components/ui/sonner"
import { META_THEME_COLORS } from "@/config/config"
import { Settings } from "@/config/meta"
import { routing } from '@/i18n/routing'
import "@/styles/globals.css"
import "@/styles/prism-theme.css"
import { Metadata } from "next"
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from "next/navigation"
import { Fragment } from "react"
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
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <Fragment>
      <html lang={locale}
        suppressHydrationWarning
        dir={locale === "ar" ? "rtl" : "ltr"}>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
            }}
          />
          <meta name="theme-color" content={META_THEME_COLORS.light} />
        </head>
        <body
          className="font-[-apple-system,BlinkMacSystemFont,system-ui,'Segoe_UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open_Sans','Helvetica_Neue',sans-serif] bg-background antialiased min-h-svh group/body overscroll-none"
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <NextIntlClientProvider>
              <div vaul-drawer-wrapper="">
                <div className="relative flex min-h-svh flex-col bg-background">
                  <Providers>{children}</Providers>
                </div>
              </div>
            </NextIntlClientProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </Fragment>
  )
}
