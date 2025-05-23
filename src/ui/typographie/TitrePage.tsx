// src/ui/typographie/TitrePage.tsx
type Props = {
  children: string
}

export default function TitrePage({ children }: Props) {
  return (
    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{children}</h1>
  )
}
