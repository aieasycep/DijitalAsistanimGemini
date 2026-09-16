import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';

export default function AssistantScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Asistan</Text>
      <ScrollView style={styles.chatArea}>
        <View style={styles.bubbleAI}>
          <Text style={styles.textAI}>Size nasıl yardımcı olabilirim? Bugünün brifingini okumamı ister misiniz?</Text>
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Dijital Asistan'a sor..." placeholderTextColor="#A0A0B2" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F1F8', paddingTop: 60 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#0F0F1A', paddingHorizontal: 20, marginBottom: 10 },
  chatArea: { flex: 1, padding: 20 },
  bubbleAI: { backgroundColor: 'white', padding: 16, borderRadius: 16, borderBottomLeftRadius: 4, maxWidth: '85%' },
  textAI: { fontSize: 15, color: '#0F0F1A', lineHeight: 22 },
  inputContainer: { padding: 16, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#E8E8F0' },
  input: { backgroundColor: '#F1F1F8', padding: 12, borderRadius: 20, fontSize: 16, color: '#0F0F1A' }
});
