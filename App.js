
import React from 'react';
import { View, StatusBar } from 'react-native';
import RootStack from './src/screens/RootStack';

const App = () => {

  console.disableYellowBox = true;

  return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <RootStack />
      </View>
  );
}

export default App;