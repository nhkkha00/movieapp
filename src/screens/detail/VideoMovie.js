import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import COLORS from '../../colors';
import YouTube from 'react-native-youtube';
import { GOOGLE_API_KEY } from '../../connection/ApiKey';


const VideoMovie = ({ keyVideo, navigation }) => {

  // const image_source = `${URL_IMG}/w500${item.poster_path}`;

  function onChangeState(state) {
    switch (state.state) {
      case 'playing':
        console.log('isPlaying');
        break;
      case 'buffering':
        console.log('buffering');
        break;
      default:
        console.log('defautl');
        break;
    }
  }

  return (
      <YouTube
        apiKey={GOOGLE_API_KEY}
        videoId={keyVideo} // The YouTube video ID
        loop={false} // control whether the video should loop when ended
        onError={e => console.log('ERROR', e)}
        onChangeState={onChangeState}
        controls={1}
        style={styles.video}
      />
  );
}

const styles = StyleSheet.create({
  video: {
    alignSelf: 'stretch',
    height: 300 
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