import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, Easing, Animated } from 'react-native';
import COLORS from '../res/color/colors';
import CastScreen from './detailCast/CastScreen';
import DetailCastScreen from './detailCast/DetailCastScreen';
import MainScreen from './main/MainScreen';
import DetailStack from './detailMovie/DetailStack';

const RootStack = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main' screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalFadeTransition
      }}
      >
        <Stack.Screen
          name='Main'
          component={MainScreen}
        />
        <Stack.Screen
          name='DetailStack'
          component={DetailStack}
          options={{
            headerStyle:{
              height:0
            }
          }}
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
    backgroundColor: COLORS.mainBg
  }
});

export default RootStack;