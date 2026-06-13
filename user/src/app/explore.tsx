import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';

import { Link } from 'expo-router';

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Explore Wisata</Text>

      <Text style={styles.subtitle}>
        Temukan spot menarik di Pantai Setigi Heni
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Cari spot wisata..."
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📸 Spot Foto Pantai</Text>

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
            }}
          style={styles.image}
         />

        <Text style={styles.cardText}>
          Area favorit pengunjung untuk berfoto.
        </Text>

        <Text style={styles.info}>
          ⭐ Rating: 4.8/5
        </Text>

        <Text style={styles.info}>
          👥 Pengunjung: 1.200+
        </Text>

        <Text style={styles.info}>
          🟢 Buka Hari Ini
        </Text>

        <Link href="/detail" asChild>
          <Text style={styles.detailButton}>
            Lihat Detail →
          </Text>
        </Link>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌊 Area Pantai</Text>
        <Text style={styles.cardText}>
          Menikmati pemandangan laut dan ombak.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🛖 Gazebo</Text>
        <Text style={styles.cardText}>
          Tempat istirahat bersama keluarga.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🍽️ Area Kuliner</Text>
        <Text style={styles.cardText}>
          Menyediakan berbagai makanan dan minuman.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          🎣 Spot Memancing
        </Text>

        <Text style={styles.cardText}>
          Lokasi favorit pengunjung yang gemar memancing.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          🌅 Titik Sunset Terbaik
        </Text>

        <Text style={styles.cardText}>
          Area terbaik untuk menikmati pemandangan matahari terbenam.
        </Text>
      </View>

    </ScrollView>
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
    color: '#64748b',
    marginTop: 10,
    marginBottom: 20,
  },

  search: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 10,
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
    marginBottom: 8,
  },

  cardText: {
    color: '#64748b',
  },

  image: {
  width: '100%',
  height: 180,
  borderRadius: 10,
  marginBottom: 10,
  },

  info: {
  color: '#64748b',
  marginTop: 8,
  },

  detailButton: {
  color: '#2563eb',
  fontWeight: 'bold',
  marginTop: 10,
  },
});