import React from 'react'
import '../index.css'
import { SiteHeader } from '@/components/site-header'

export const metadata = {
  title: 'Power Intake',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
