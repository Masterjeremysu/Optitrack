// src/composants/layout/LayoutGlobal.tsx
import { ReactNode } from 'react' // ❌


import HeaderGlobal from './HeaderGlobal'

type Props = {
  children: ReactNode
}

export default function LayoutGlobal({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <HeaderGlobal />
      <main className="p-6 max-w-6xl mx-auto">{children}</main>
    </div>
  )
}
