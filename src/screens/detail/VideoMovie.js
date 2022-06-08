import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { URL_IMG, URL_VIDEO } from '../../connection/MethodApi';
import Entypo from 'react-native-vector-icons/Entypo';
import COLORS from '../../colors';
import YouTube from 'react-native-youtube';
import { GOOGLE_API_KEY } from '../../connection/ApiKey';


const VideoMovie = ({item, keyVideo, onPressBackButton }) => {

  const image_source = `${URL_IMG}/w500${item.poster_path}`;

  const video_source = `${URL_VIDEO}${keyVideo}`;

  return (
    <View style={styles.container}>
      <YouTube
        apiKey={GOOGLE_API_KEY}
        videoId={keyVideo} // The YouTube video ID
        play // control playback of video with true/false
        fullscreen={false} // control whether the video should play in fullscreen or inline
        loop={false} // control whether the video should loop when ended
        style={{ alignSelf: 'stretch', height: 300 }}
      />
      <TouchableOpacity style={styles.icon} onPress={onPressBackButton}>
        <Entypo name='chevron-left' color={COLORS.white} size={50} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  icon: {
    position: 'absolute',
    top: 10,
    marginLeft: 10
  },
  image: {
    alignSelf: 'stretch',
    height: 300
  }
});

export default VideoMovie;