// src/pdf/RapportLivraisons.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from '@react-pdf/renderer'
import type { Livraison } from '../hooks/useFiltrageLivraisons'

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  logo: { width: 120, height: 40 },
  titre: { fontSize: 18, marginBottom: 10, color: '#2b6cb0' },
  table: { width: 'auto' },
  row: { flexDirection: 'row', borderBottom: '1px solid #ccc', paddingVertical: 4 },
  headerRow: { backgroundColor: '#ebf8ff', fontWeight: 'bold' },
  cell: { flexGrow: 1, paddingHorizontal: 4 },
  total: { marginTop: 12, textAlign: 'right', fontSize: 12, fontWeight: 'bold' },
  footer: { marginTop: 40, fontSize: 10, color: '#999', borderTop: '1px solid #ddd', paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' },
  signature: { fontSize: 10, marginTop: 4 },
})

type Props = {
  livraisons: Livraison[]
  mois?: string
  annee?: string
}

export default function RapportLivraisons({ livraisons, mois, annee }: Props) {
  const totalPoids = livraisons.reduce((acc, l) => acc + l.poids, 0)
  const totalValeur = livraisons.reduce((acc, l) => acc + l.valeur, 0)

  return (
    <Document>
      <Page style={styles.page}>
        {/* 🧠 En-tête avec logo + date */}
        <View style={styles.header}>
          <Image
            src="https://dummyimage.com/120x40/2b6cb0/ffffff&text=OptiTrack"
            style={styles.logo}
          />
          <Text>Rapport généré le : {new Date().toLocaleDateString()}</Text>
        </View>

        <Text style={styles.titre}>
          📦 Rapport des livraisons {mois && annee ? `– ${mois}/${annee}` : ''}
        </Text>

        {/* 🔠 Table */}
        <View style={[styles.table, styles.row, styles.headerRow]}>
          <Text style={styles.cell}>Client</Text>
          <Text style={styles.cell}>Pays</Text>
          <Text style={styles.cell}>Statut</Text>
          <Text style={styles.cell}>Poids</Text>
          <Text style={styles.cell}>Valeur</Text>
          <Text style={styles.cell}>Date</Text>
        </View>

        {livraisons.map((l) => (
          <View style={styles.row} key={l.id}>
            <Text style={styles.cell}>{l.client}</Text>
            <Text style={styles.cell}>{l.pays_destination}</Text>
            <Text style={styles.cell}>{l.statut}</Text>
            <Text style={styles.cell}>{l.poids} kg</Text>
            <Text style={styles.cell}>{l.valeur.toFixed(2)} €</Text>
            <Text style={styles.cell}>
              {new Date(l.date_expedition).toLocaleDateString()}
            </Text>
          </View>
        ))}

        <Text style={styles.total}>
          🔢 Total : {livraisons.length} livraisons · {totalPoids} kg · {totalValeur.toFixed(2)} €
        </Text>

        {/* ✅ Pied de page pro */}
        <View style={styles.footer}>
          <Text>Responsable logistique : ____________________________</Text>
          <Text style={styles.signature}>© OptiTrack — www.optitrack.io</Text>
        </View>
      </Page>
    </Document>
  )
}
