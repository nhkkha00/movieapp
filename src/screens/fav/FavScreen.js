import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native'
import COLORS from '../../res/color/colors';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store';
import { URL_IMG } from '../../connection/MethodApi';

const Screen = () => {

  const dispatch = useDispatch();

  const fav = useSelector(state => state.favs.dataFav);

  const renderItem = ({ item, index }) => {

    // const randomHeight = getRandomValues(heightList);


    let height = 200;

    let width = 180;

    if (index % 2 === 0) {
      height = 220;
    }
    if (index % 3 === 0) {
      height = 180;
    }

    const image_source = `${URL_IMG}/w200${item.poster_path}`;

    return (
      <TouchableOpacity style={{ flex: 1, marginBottom: 10 }} activeOpacity={.7} onPress={() => {
        // onTouchMovie(item);
      }}>
        <Image style={{
          alignSelf: 'stretch',
          width: width,
          height: height,
          borderRadius: 10,
          margin: 10
        }}
          resizeMode='cover'
          source={{ uri: image_source }} />
        <Text
          numberOfLines={1}
          style={{
            color: COLORS.white,
            marginLeft: 10,
            width: width,
            textAlign: 'auto',
            fontFamily: 'lato_regular'
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    )
  }

  useEffect(()=>{
    
  },[fav]);

  return (
    <View style={styles.container}>
      <FlatList
        overScrollMode='never'
        numColumns={2}
        style={{ alignSelf: 'stretch' }}
        contentContainerStyle={{
          paddingHorizontal: 10,
          alignSelf: 'stretch'
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={fav}
        renderItem={renderItem}
      />
    </View>
  );
}


const FavScreen = () => {
  return (
    <Provider store={store}>
      <Screen />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default FavScreen;