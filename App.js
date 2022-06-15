
import React from 'react';
import { View, StatusBar } from 'react-native';
import RootStack from './src/screens/RootStack';
import COLORS from './src/res/color/colors';

const App = () => {

  console.disableYellowBox = true;

  return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={COLORS.mainBg} />
        <RootStack />
      </View>
  );
}

export default App;