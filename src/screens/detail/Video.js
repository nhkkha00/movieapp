import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { URL_IMG } from '../../connection/MethodApi';

const Video = ({item}) => {

  const image_source = `${URL_IMG}/w500${item.poster_path}`;

  return (
    <View style={styles.container}>
      <Image style={{width:'100%',height:300}} resizeMode='cover' source={{uri:image_source}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:300,
  }
});

export default Video;