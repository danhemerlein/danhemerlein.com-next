import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import AppState from './components/AppState'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'dan hemerlein',
  description: "dan hemerlein's online portfolio",
}

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <html lang="en">
    <body className={inter.className}>
      <AppState>
        <main className="px-10 py-6">{children}</main>
      </AppState>
    </body>
  </html>
)

export default Layout
