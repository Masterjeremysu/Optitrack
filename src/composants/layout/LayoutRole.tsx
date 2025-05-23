// src/composants/layout/LayoutRole.tsx
import type { ReactNode } from 'react'
import HeaderGlobal from './Header'
import MenuLatéral from './MenuLatéral'

type Props = {
  children: ReactNode
}

export default function LayoutRole({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <MenuLatéral />
      <div className="flex-1">
        <HeaderGlobal />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
