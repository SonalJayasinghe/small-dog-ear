'use client'

import { ReactNode, useState } from 'react'
import { NextAuthProvider } from './auth-provider'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

export default function Providers({ children }: { children: ReactNode }) {

  return (
    <NextAuthProvider>
            <main>
              {children}
            </main>
    </NextAuthProvider>
  )
}