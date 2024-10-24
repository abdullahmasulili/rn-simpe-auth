import auth from '@react-native-firebase/auth';

async function login({ email, password }) {
  const { user } = await auth().signInWithEmailAndPassword(email, password);

  return user;
}

async function logout() {
  await auth().signOut();
}

export { login, logout };
