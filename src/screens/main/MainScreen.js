import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '../home/HomeScreen'
import FavScreen from '../fav/FavScreen';
import COLORS from '../../colors';
import TabBottom from './TabBotom';

const Tab = createBottomTabNavigator();

const MainScreen = () => {

  return (
    <Tab.Navigator
    sceneContainerStyle={{backgroundColor:COLORS.mainBg}}
    screenOptions={{
      headerShown:false,
      tabBarStyle:{
        backgroundColor:COLORS.mainBg,
        borderTopWidth:0
      }
    }}
    tabBar= {props => <TabBottom {...props}/>}
    >
        <Tab.Screen name='Home' component={HomeScreen}/>
        <Tab.Screen name='Fav' component={FavScreen}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MainScreen;