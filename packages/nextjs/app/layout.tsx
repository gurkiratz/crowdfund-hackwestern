import type { Metadata } from 'next'
import { ScaffoldStarkAppWithProviders } from '~~/components/ScaffoldStarkAppWithProviders'
import '~~/styles/globals.css'
import { ThemeProvider } from '~~/components/ThemeProvider'
import { Navbar } from '~~/components/Navbar'
import TanstackProvider from '@/components/TanstackProvider'
// import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Crowdfund - Starknet',
  description:
    'A decentralized crowdfunding platform built with Next.js and Starknet',
  icons: '/logo.ico',
}

const ScaffoldStarkApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          <TanstackProvider>
            <ScaffoldStarkAppWithProviders>
              {children}
            </ScaffoldStarkAppWithProviders>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default ScaffoldStarkApp
