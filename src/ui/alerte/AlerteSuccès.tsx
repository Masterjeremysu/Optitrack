// src/ui/alerte/AlerteSuccès.tsx
type Props = {
  message: string
}

export default function AlerteSuccès({ message }: Props) {
  return (
    <div className="bg-green-100 text-green-800 font-medium px-4 py-2 rounded mb-4 border border-green-300">
      ✅ {message}
    </div>
  )
}
