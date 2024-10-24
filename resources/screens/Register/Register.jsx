import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import styles from './styles';
import { AuthContext } from '../../context/auth-context';
import { signUp } from '../../lib/firebaseAuth';
import firebase from '@react-native-firebase/app';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    handleSetCurrentUser,
    handleSetIsAuthenticated,
    handleSetAccessToken,
  } = useContext(AuthContext);

  async function handleRegister() {
    setLoading(true);

    try {
      const user = await signUp({ email, password });

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
        <Text variant="headlineSmall">Please Input Your Credential</Text>
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
          style={styles.loginBtn}
          onPress={handleRegister}>
          Register
        </Button>
        <Text variant="bodyMedium" style={styles.registerLabel}>
          Already Have Account?
        </Text>
        <Button onPress={() => navigation.navigate('Login')}>Sign In</Button>
      </View>
    </KeyboardAvoidingView>
  );
}
