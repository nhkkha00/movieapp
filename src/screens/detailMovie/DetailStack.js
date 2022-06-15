import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CastScreen from '../detailCast/CastScreen';
import DetailCastScreen from '../detailCast/DetailCastScreen';
import DetailScreen from './DetailScreen';


const Stack = createStackNavigator();

const DetailStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        ...TransitionPresets.ModalFadeTransition,
      }}>
      <Stack.Screen
        name='Detail'
        component={DetailScreen}
        options={{
          headerStyle:{
            height:0
          }
        }}
        />
      <Stack.Screen name='Cast' component={CastScreen} />
      <Stack.Screen name='DetailCast' component={DetailCastScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default DetailStack;