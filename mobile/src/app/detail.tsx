import { View, Text, StyleSheet } from 'react-native';

export default function DetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Pantai Setigi Heni
      </Text>


      <Text style={styles.subtitle}>
        Informasi Lengkap Wisata
      </Text>

      <Text style={styles.info}>
        📍 Desa Canggung, Kalianda, Lampung Selatan
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
  fontSize: 16,
  color: '#64748b',
  marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginTop: 10,
    color: '#64748b',
  },
});