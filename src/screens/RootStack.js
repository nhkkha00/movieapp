import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, Easing, Animated } from 'react-native';
import COLORS from '../colors';
import DetailScreen from './detail/DetailScreen';
import MainScreen from './main/MainScreen';


const Stack = createStackNavigator();

const RootStack = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main' screenOptions={{ 
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS
      }}
      >
        <Stack.Screen
          name='Main'
          component={MainScreen}
        />
        <Stack.Screen
          name='Detail'
          component={DetailScreen}
        
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:COLORS.mainBg
  }
});

export default RootStack;