import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Viral Shorts Automation',
  description: 'Automate viral short-form video content creation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
