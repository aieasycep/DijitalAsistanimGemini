import { View, Text, StyleSheet, FlatList } from 'react-native';

const DATA = [
  { id: '1', title: 'Toplantı: Proje Sunumu', time: '14:00', type: 'meeting' },
  { id: '2', title: 'Fatura Ödemesi', time: 'Son Gün', type: 'deadline' },
];

export default function FlowScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Akış</Text>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardTime}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F1F8', padding: 20, paddingTop: 60 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#0F0F1A', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardTime: { fontSize: 14, color: '#6B6B80', marginTop: 4 }
});
