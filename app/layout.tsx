import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'dan hemerlein',
  description: "dan hemerlein's online portfolio",
}

export default ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <html lang="en">
    <body className={inter.className}>
      <main className="p-4">{children}</main>
    </body>
  </html>
)
