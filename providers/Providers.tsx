'use client'

import { ReactNode } from 'react'
import { NextAuthProvider } from './auth-provider'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'

export default function Providers({ children }: { children: ReactNode }) {

  return (
    <NextAuthProvider>
                <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
                    <Toaster />

            <main>
              {children}
            </main>
            </ThemeProvider>
    </NextAuthProvider>
  )
}