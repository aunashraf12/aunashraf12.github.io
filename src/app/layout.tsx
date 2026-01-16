import type { Metadata } from 'next'
import { ThemeProvider } from '@/contexts/ThemeContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Snoonu MerchantOS',
  description: 'Boost your merchant performance with AI-powered insights and automated fixes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-snoonu-white dark:bg-snoonu-dark-black text-snoonu-black dark:text-snoonu-dark-white transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}