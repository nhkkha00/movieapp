import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { URL_IMG, URL_VIDEO } from '../../connection/MethodApi';
import Entypo from 'react-native-vector-icons/Entypo';
import COLORS from '../../colors';


const Video = ({ item , onPressBackButton}) => {

  const image_source = `${URL_IMG}/w500${item.poster_path}`;


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri:image_source}} resizeMode='stretch'/>
      <TouchableOpacity style={styles.icon} onPress={onPressBackButton}>
        <Entypo name='chevron-left' color={COLORS.white} size={50}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
  },
  icon: {
    position: 'absolute',
    top: 10,
    marginLeft: 10
  },
  image: {
    width: '100%',
    height: 300,
  }
});

export default Video;