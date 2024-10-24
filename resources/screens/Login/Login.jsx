import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import firebase from '@react-native-firebase/app';
import styles from './styles';
import { login } from '../../lib/firebaseAuth';
import { AuthContext } from '../../context/auth-context';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    handleSetCurrentUser,
    handleSetIsAuthenticated,
    handleSetAccessToken,
  } = useContext(AuthContext);

  async function handleLogin() {
    setLoading(true);

    try {
      const user = await login({ email, password });

      handleSetCurrentUser(user);
      handleSetIsAuthenticated(true);
      handleSetAccessToken(firebase.auth().getIdToken);
      setLoading(false);

      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.rootContainer}>
      <View style={styles.container}>
        <Text variant="headlineSmall">Please Sign In</Text>
        <TextInput
          label="Email"
          dense
          mode="outlined"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          secureTextEntry
          label="Password"
          dense
          mode="outlined"
          value={password}
          onChangeText={setPassword}
        />
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.loginBtn}
          loading={loading}
          disabled={loading}>
          Login
        </Button>
        <Text variant="bodyMedium" style={styles.registerLabel}>
          Don't Have An Account?
        </Text>
        <Button onPress={() => navigation.navigate('Register')}>
          Register
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
