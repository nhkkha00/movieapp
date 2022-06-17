import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native'
import COLORS from '../../res/color/colors';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store';
import { getSimilarMovies } from '../../redux/actions';
import { useDeviceOrientation } from '@react-native-community/hooks';
import FavItem from './FavItem';

const Screen = ({ navigation }) => {

  const dispatch = useDispatch();

  const { landscape } = useDeviceOrientation();

  const fav = useSelector(state => state.favs.dataFav);

  useEffect(() => {

  }, [fav]);


  async function onTouchMovie(item) {
    //get related movie
    dispatch(getSimilarMovies(item.id));
    navigation.navigate('DetailStack',
      {
        screen: 'Detail',
        params: {
          screen: 'Fav',
          itemMovie: item
        }
      });
  }

  return (
    <View style={styles.container}>
      {landscape ?
        <FlatList
          key={'horizontal'}
          overScrollMode='never'
          numColumns={3}
          style={{ alignSelf: 'stretch' }}
          contentContainerStyle={{
            paddingHorizontal: 10,
            alignSelf: 'stretch',
            justifyContent: 'center'
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={fav}
          renderItem={({ item, index }) => {
            return (
              <FavItem item={item} index={index} landscape={landscape} onTouchMovie={onTouchMovie} />
            )
          }}
        />
        :
        <FlatList
          key={'vertical'}
          overScrollMode='never'
          numColumns={2}
          style={{ alignSelf: 'stretch' }}
          contentContainerStyle={{
            paddingHorizontal: 10,
            alignSelf: 'stretch',
            justifyContent: 'center'
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={fav}
          renderItem={({ item, index }) => {
            return (
              <FavItem item={item} index={index} landscape={landscape} onTouchMovie={onTouchMovie} />
            )
          }}
        />
      }
    </View>
  )

}


const FavScreen = ({ route, navigation }) => {
  return (
    <Provider store={store}>
      <Screen navigation={navigation} />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default FavScreen;