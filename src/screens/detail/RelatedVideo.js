
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Button, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import COLORS from '../../colors';
import { GET_SIMILAR_MOVIE, URL_IMG } from '../../connection/MethodApi';

const RelatedVideo = ({ data, itemVideo, onPressRelatedMovie}) => {


  //filter item already show
  const dataFilter = data.filter(v=>v.id!==itemVideo.id);

  return (
    <View style={{backgroundColor:COLORS.mainBg}}>
      <FlatList
        overScrollMode='never'
        data={dataFilter}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <VideoItem item={item} onPressRelatedMovie={() => { onPressRelatedMovie(item) }} />
          )
        }}
      />
    </View>
  );
}

const VideoItem = ({ item, onPressRelatedMovie }) => {

  const image_source = `${URL_IMG}/w200${item.poster_path}`

  return (
    <TouchableOpacity activeOpacity={.7} style={styles.container} onPress={onPressRelatedMovie}>
      <Image style={styles.image} resizeMode='cover' source={{ uri: image_source }} />
      <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    margin:10
  },
  image: {
    width: 160,
    height: 130,
    borderRadius: 10
  },
  title: {
    width: 150,
    color: COLORS.white,
    marginTop:10,
    textAlign: 'auto',
  }
});

export default RelatedVideo;