import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Horecast',
  description: 'AI競馬予想サイト（開発中）',
  metadataBase: new URL('https://horecast.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Horecast',
    description: 'AI競馬予想サイト（開発中）',
    url: 'https://horecast.net',
    siteName: 'Horecast',
    images: [
      {
        url: 'https://horecast.net/opengraph-image.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
