import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

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
        <Text style={styles.cardText}>
          Area favorit pengunjung untuk berfoto.
        </Text>

        <Text style={styles.info}>
          ⭐ Rating: 4.8/5
        </Text>

        <Text style={styles.info}>
          👥 Pengunjung: 1.200+
        </Text>
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

  info: {
  color: '#64748b',
  marginTop: 8,
  },
});