import { View, Text, StyleSheet } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRIPNESIA</Text>

      <Text style={styles.subtitle}>
        Explore Setigi Heni
      </Text>

      <Text style={styles.location}>
        Kalianda, Lampung Selatan
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 20,
    color: '#38BDF8',
    marginBottom: 5,
  },

  location: {
    fontSize: 16,
    color: '#CBD5E1',
  },
});