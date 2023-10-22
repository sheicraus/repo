import './globals.css'
import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import { Providers } from './providers'

const quickSand = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'repo',
  description: 'Create, collaborate, and share checklists to anyone.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={quickSand.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
