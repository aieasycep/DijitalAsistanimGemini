import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function TodayScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Günaydın, Mehmet</Text>
        <Text style={styles.date}>16 Eylül Pazartesi</Text>
      </View>
      <View style={styles.hero}>
        <Text style={styles.heroText}>Bugün bilmen gereken 5 şey var.</Text>
        <View style={styles.actionRow}>
          <View style={styles.button}><Text style={styles.buttonText}>Brifingimi Gör</Text></View>
          <View style={styles.buttonSecondary}><Text style={styles.buttonTextSecondary}>Dinle · 2 dk</Text></View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Öncelikler</Text>
        {/* Priority Cards */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F1F8' },
  header: { padding: 20, paddingTop: 60 },
  greeting: { fontSize: 28, fontWeight: '700', color: '#0F0F1A' },
  date: { fontSize: 16, color: '#6B6B80', marginTop: 4 },
  hero: { margin: 20, padding: 20, backgroundColor: '#5B5CE2', borderRadius: 16 },
  heroText: { fontSize: 24, fontWeight: '600', color: 'white', marginBottom: 20 },
  actionRow: { flexDirection: 'row', gap: 10 },
  button: { backgroundColor: 'white', padding: 12, borderRadius: 8, flex: 1, alignItems: 'center' },
  buttonText: { color: '#5B5CE2', fontWeight: '600' },
  buttonSecondary: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: 8, flex: 1, alignItems: 'center' },
  buttonTextSecondary: { color: 'white', fontWeight: '600' },
  section: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#0F0F1A', marginBottom: 16 }
});
