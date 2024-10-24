/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  useColorScheme,
} from 'react-native';
import MainStack from './resources/router/Stack';
import { PaperProvider } from 'react-native-paper';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <MainStack />
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
