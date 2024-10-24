import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import styles from './styles';

export default function Register({ navigation }) {
  return (
    <KeyboardAvoidingView style={styles.rootContainer}>
      <View style={styles.container}>
        <Text variant="headlineSmall">Please Input Your Credential</Text>
        <TextInput label="Email" dense mode="outlined" />
        <TextInput label="Password" dense mode="outlined" />
        <Button mode="contained" style={styles.loginBtn}>
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
