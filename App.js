import React from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

import {AppProvider, useApp} from './src/context/AppContext';
import RootNavigator from './src/navigation/RootNavigator';

function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#FFC857" />
    </View>
  );
}

function Inner() {
  const {ready, theme} = useApp();
  if (!ready) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Inner />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF9E8'},
});
