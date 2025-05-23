// src/ui/bouton/BoutonPrincipal.tsx
import { ReactNode } from 'react' // ❌



type Props = {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  plein?: boolean
}

export default function BoutonPrincipal({
  children,
  onClick,
  type = 'button',
  plein = true,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${
        plein
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
      }`}
    >
      {children}
    </button>
  )
}
