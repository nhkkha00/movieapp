import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, Easing, Animated } from 'react-native';
import COLORS from '../res/color/colors';
import CastScreen from './detailCast/CastScreen';
import DetailCastScreen from './detailCast/DetailCastScreen';
import DetailScreen from './detailMovie/DetailScreen';
import MainScreen from './main/MainScreen';


const Stack = createStackNavigator();

const RootStack = () => {

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
          name='Detail'
          component={DetailScreen}
          options={{
            //set height 0 instead hide (over view)
            headerStyle: {
              height: 0
            }
          }}
        />
        <Stack.Screen
          name='Cast'
          component={CastScreen}
         />
         <Stack.Screen
          name='DetailCast'
          component={DetailCastScreen}
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