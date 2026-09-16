import { View, Text, StyleSheet } from 'react-native';

export default function PlanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Plan</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bugünün Programı</Text>
        <Text style={styles.cardSubtitle}>3 Toplantı, 2 Açık Görev</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F1F8', padding: 20, paddingTop: 60 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#0F0F1A', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: '#6B6B80' }
});
