import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';

import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tripnesia</Text>
      <TextInput
        style={styles.search}
        placeholder="Cari destinasi wisata..."
      />
      <Text style={styles.welcome}>
        Halo, Traveler 👋
      </Text>

      <Text style={styles.subtitle}>
        Selamat Datang di Pantai Setigi Heni
      </Text>

      <Text style={styles.description}>
        Nikmati keindahan Pantai Setigi Heni yang terletak di
        Kalianda, Lampung Selatan. Temukan berbagai spot foto
        menarik dan panorama pantai yang memukau.
      </Text>

      <Text style={styles.sectionTitle}>
        Kategori Wisata
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pantai Setigi Heni</Text>
        <Text>Kalianda, Lampung Selatan</Text>

      <Link href="/detail" asChild>
        <Text style={styles.detailButton}>
          Lihat Detail →
        </Text>
      </Link>
      </View>

      <Text style={styles.sectionTitle}>
         Fasilitas
      </Text>

      <View style={styles.card}>
        <Text>🚗 Area Parkir</Text>
        <Text>🕌 Mushola</Text>
        <Text>🚻 Toilet</Text>
        <Text>📸 Spot Foto</Text>
      </View>

      <Text style={styles.info}>
  📍    Desa Canggung, Kalianda, Lampung Selatan
      </Text>

      <Text style={styles.info}>
  💰    Tiket Masuk: Rp10.000
      </Text>

      <Text style={styles.info}>
  🕒    Jam Operasional: 08.00 - 18.00 WIB
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcome: {
  fontSize: 16,
  color: '#64748b',
  marginTop: 20,
},
search: {
  backgroundColor: '#f1f5f9',
  padding: 12,
  borderRadius: 10,
  marginBottom: 20,
},
sectionTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
},
description: {
  fontSize: 14,
  color: '#64748b',
  marginBottom: 20,
  lineHeight: 22,
},
info: {
  marginTop: 8,
  color: '#64748b',
},
detailButton: {
  marginTop: 10,
  color: '#2563eb',
  fontWeight: 'bold',
},
});