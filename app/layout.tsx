import { ThemeProvider } from "@/components/context/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Settings } from "@/lib/meta"
import { GoogleTagManager } from "@next/third-parties/google"
import type { Metadata } from "next"
import "./globals.css"
import "./prism-theme.css"
import { Fragment } from "react"
import { SheetWrapper } from "@/components/SheetWrapper"
// import { SplashScreen } from "./SplashScreen"
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
        <body className="font-[-apple-system,BlinkMacSystemFont,system-ui,'Segoe_UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open_Sans','Helvetica_Neue',sans-serif] font-medium antialiased min-h-svh" suppressHydrationWarning >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <SheetWrapper>
              <div>
                <div className="relative flex min-h-svh flex-col bg-background">
                  {children}
                </div>
              </div>
            </SheetWrapper>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </Fragment>
  )
}
