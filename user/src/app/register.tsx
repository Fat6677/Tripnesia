import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Akun</Text>

      <Text style={styles.subtitle}>
        Buat akun Tripnesia untuk mulai menjelajahi wisata
      </Text>

      <TextInput
        placeholder="Nama Lengkap"
        style={styles.input}
      />

      <TextInput
        placeholder="Masukkan Email"
        style={styles.input}
      />

      <TextInput
        placeholder="Masukkan Password"
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Konfirmasi Password"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Sudah punya akun? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
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
  borderRadius: 12,
  marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginText: {
  textAlign: 'center',
  marginTop: 20,
  color: '#64748b',
  },
});