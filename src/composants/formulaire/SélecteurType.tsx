import { ReactNode } from 'react'
import HeaderGlobal from '../layout/Header'
import MenuLatéral from '../layout/MenuLatéral'

type Props = {
  enfants: ReactNode
}

export default function LayoutRole({ enfants }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <MenuLatéral />
      <div className="flex-1">
        <HeaderGlobal />
        <main className="p-6">{enfants}</main>
      </div>
    </div>
  )
}
