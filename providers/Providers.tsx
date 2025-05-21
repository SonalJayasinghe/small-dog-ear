'use client'

import { ReactNode, useState } from 'react'
import { NextAuthProvider } from './auth-provider'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }: { children: ReactNode }) {

  return (
    <NextAuthProvider>
                <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main>
              {children}
            </main>
            </ThemeProvider>
    </NextAuthProvider>
  )
}