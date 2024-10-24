import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import styles from './styles';

export default function Login() {
  return (
    <KeyboardAvoidingView style={styles.rootContainer}>
      <View style={styles.container}>
        <Text variant="headlineSmall">Please Sign In</Text>
        <TextInput label="Email" dense mode="outlined" />
        <TextInput label="Password" dense mode="outlined" />
        <Button mode="contained" style={styles.loginBtn}>
          Login
        </Button>
        <Text variant="bodyMedium" style={styles.registerLabel}>
          Don't Have An Account?
        </Text>
        <Button>Register</Button>
      </View>
    </KeyboardAvoidingView>
  );
}
