import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import DetailScreen from './detail/DetailScreen';
import MainScreen from './main/MainScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Main' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Main' component={MainScreen}/>
            <Stack.Screen name='Detail' component={DetailScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default RootStack;