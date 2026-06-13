import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        👋 Masuk
      </Text>

      <Text style={styles.subtitle}>
        Selamat datang kembali di Tripnesia
      </Text>

      <TextInput
        placeholder="Masukkan Email"
        style={styles.input}
      />

      <TextInput
        placeholder="Masukkan Password"
        secureTextEntry
        style={styles.input}
      />

      <Text style={styles.forgotPassword}>
        Lupa Password?
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  subtitle: {
  fontSize: 14,
  color: '#64748b',
  marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0ea5e9',
    padding: 14,
    borderRadius: 10,
  },
  forgotPassword: {
  textAlign: 'right',
  color: '#0ea5e9',
  marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});