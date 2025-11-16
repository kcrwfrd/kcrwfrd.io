import type { Metadata } from 'next'
import { Crimson_Pro, Spectral } from 'next/font/google'
import Link from 'next/link'

import './globals.css'

const crimsonPro = Crimson_Pro({
  variable: '--font-crimson-pro',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

const spectral = Spectral({
  variable: '--font-spectral',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kevin Crawford, Software Engineer',
  description: 'Essays, thoughts, and stories',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${crimsonPro.variable} ${spectral.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="border-b border-border py-8">
            <div className="mx-auto max-w-4xl px-5">
              <div className="flex items-baseline justify-between">
                <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl text-balance">
                  <Link href="/">Kevin Crawford, Software Engineer</Link>
                </h1>
                <nav className="flex gap-6 text-sm font-medium text-foreground-muted md:gap-8 md:text-base">
                  <Link
                    href="/"
                    className="transition-colors hover:text-foreground"
                  >
                    Home
                  </Link>
                  <a
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    About
                  </a>
                </nav>
              </div>
            </div>
          </header>

          {children}

          {/* Footer */}
          <footer className="border-t border-border px-6 py-12 text-center md:px-12 lg:px-16 mt-auto">
            <div className="mx-auto max-w-7xl">
              <p className="font-light text-sm text-foreground-muted">
                © 2013 - {new Date().getFullYear()} Kevin Crawford. All rights
                reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
