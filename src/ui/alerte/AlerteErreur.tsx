// src/ui/alerte/AlerteErreur.tsx
type Props = {
  message: string
}

export default function AlerteErreur({ message }: Props) {
  return (
    <div className="bg-red-100 text-red-800 font-medium px-4 py-2 rounded mb-4 border border-red-300">
      ⚠️ {message}
    </div>
  )
}
