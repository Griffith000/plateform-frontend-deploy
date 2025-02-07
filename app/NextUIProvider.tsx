'use client'

import { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'

export default function NextUIClientProvider({ children }: { children: ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>
}