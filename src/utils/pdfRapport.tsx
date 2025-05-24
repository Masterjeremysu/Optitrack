// src/utils/pdfRapport.ts
import { pdf } from '@react-pdf/renderer'
import type { Livraison } from '../hooks/useFiltrageLivraisons'
import RapportLivraisons from '../pdf/RapportLivraisons'

/**
 * Génère et télécharge le rapport PDF des livraisons.
 * @param livraisons Liste des livraisons à inclure dans le rapport
 * @param mois Mois (optionnel) pour le nom du fichier
 * @param annee Année (optionnelle) pour le nom du fichier
 */
export async function telechargerPDF(
  livraisons: Livraison[],
  mois?: string,
  annee?: string
) {
  try {
    const doc = <RapportLivraisons livraisons={livraisons} mois={mois} annee={annee} />
    const blob = await pdf(doc).toBlob()

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rapport_livraisons_${mois ?? 'mois'}_${annee ?? 'annee'}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('❌ Erreur lors de la génération du PDF', error)
    alert('Erreur lors du téléchargement du PDF.')
  }
}
