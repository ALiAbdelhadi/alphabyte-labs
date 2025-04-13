import { ThemeProvider } from "@/components/context/theme-provider"
import { Toaster } from "@/components/library/sonner"
import { Settings } from "@/lib/meta"
import type { Metadata } from "next"
import { Fragment } from "react"
import "./globals.css"
import "./prism-theme.css"
import Providers from "@/components/Providers"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Fragment>
      <html lang="en" suppressHydrationWarning>
        <body
          className="font-[-apple-system,BlinkMacSystemFont,system-ui,'Segoe_UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open_Sans','Helvetica_Neue',sans-serif] bg-background font-medium antialiased min-h-svh !mr-"
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
                <Providers>{children}</Providers>
              </div>
            </div>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </Fragment>
  )
}
