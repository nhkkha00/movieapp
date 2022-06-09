import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet,BackHandler } from 'react-native';
import HomeScreen from '../home/HomeScreen'
import FavScreen from '../fav/FavScreen';
import COLORS from '../../colors';
import TabBottom from './TabBotom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store';
import { getGenres } from '../../redux/actions';
import Loading from '../../components/Loading';

const Tab = createBottomTabNavigator();

const Screen = () => {

  const dispatch = useDispatch();

  const genres = useSelector(state => state.genres.dataGenres);

  useEffect(() => {

    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  useEffect(() => {
    dispatch(getGenres());
  }, [])

  if (genres.length <= 0)
    return <Loading />;
  else {
    return (
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: COLORS.mainBg }}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.mainBg,
            borderTopWidth: 0
          }
        }}
        tabBar={props => <TabBottom {...props} />}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Fav' component={FavScreen} />
      </Tab.Navigator>)
  }
}


const MainScreen = () => {
  return (
    <Provider store={store}>
      <Screen />
    </Provider>
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