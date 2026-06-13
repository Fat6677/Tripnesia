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

      <Text style={styles.description}>
        Pantai Setigi Heni merupakan salah satu destinasi wisata
        yang berada di Kalianda, Lampung Selatan. Pantai ini
        menawarkan pemandangan alam yang indah dan suasana yang
        nyaman untuk berlibur bersama keluarga.
      </Text>

      <Text style={styles.sectionTitle}>
        Galeri Wisata
      </Text>

      <Text>
        📸 Galeri Pantai Setigi Heni
      </Text>
    
      <Text style={styles.sectionTitle}>
        Informasi Pengunjung
      </Text>

      <Text style={styles.info}>
        📞 Hubungi pengelola untuk informasi lebih lanjut.
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
  description: {
  marginTop: 20,
  fontSize: 15,
  lineHeight: 24,
  },
  sectionTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 25,
  },
  photoPlaceholder: {
  height: 180,
  backgroundColor: '#e2e8f0',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
  },
});
