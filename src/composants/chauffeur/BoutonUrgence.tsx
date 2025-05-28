import { useState } from 'react'

export default function BoutonUrgence() {
  const [ouvert, setOuvert] = useState(false)

  const contacts = [
    { nom: '📞 Responsable logistique', tel: '06 00 00 00 01' },
    { nom: '🦺 Référent QHSE', tel: '06 00 00 00 02' },
    { nom: '🚛 Dépannage véhicule', tel: '06 00 00 00 03' },
    { nom: '🆘 Urgences sécurité', tel: '112' },
  ]

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOuvert(!ouvert)}
        className="bg-red-600 text-white px-3 py-2 rounded shadow hover:bg-red-700 text-sm"
      >
        🆘 Urgence
      </button>

      {ouvert && (
        <div className="absolute z-10 right-0 mt-2 w-72 bg-white border border-gray-300 rounded shadow-md p-4 space-y-2 text-sm text-gray-800">
          <h3 className="font-bold mb-2">Contacts d’urgence</h3>
          {contacts.map((c) => (
            <div key={c.tel}>
              <span className="block font-medium">{c.nom}</span>
              <a
                href={`tel:${c.tel.replace(/\s/g, '')}`}
                className="text-blue-600 underline"
              >
                {c.tel}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
