import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes';
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#28262e"
        translucent
      />
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
