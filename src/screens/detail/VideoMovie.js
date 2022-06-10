import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import COLORS from '../../colors';
import YouTube from 'react-native-youtube';
import { GOOGLE_API_KEY } from '../../connection/ApiKey';


const VideoMovie = ({ keyVideo, onReady, onErrorVideo }) => {

  function onChangeState(state) {
    console.log(state);
  }

  return (
    <View>
      <YouTube
        apiKey={GOOGLE_API_KEY}
        videoId={keyVideo} // The YouTube video ID
        onError={onErrorVideo}
        onReady={onReady}
        onChangeState={onChangeState}
        controls={1}
        loop={true}
        style={styles.video}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
});

export default VideoMovie;