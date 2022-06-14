import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import YouTube from 'react-native-youtube';


const FavScreen = () => {

  return (
    <View style={styles.container}>
      <YouTube
        apiKey={'AIzaSyB73p4e4x9nzbB8OBtgkVGQwxYKzmq-cwo'}
        videoId={'dfF8D4VKpCY'} // The YouTube video ID
        onError={(e)=>console.log(e)}
        onChangeState={state=>console.log(state)}
        controls={1}
        loop={true}
        fullscreen={false}
        style={{ alignSelf: 'stretch', height: 300 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FavScreen;