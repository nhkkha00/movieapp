import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaskedView from '@react-native-masked-view/masked-view'
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../res/color/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import YouTube from 'react-native-youtube';
import { GOOGLE_API_KEY } from '../../connection/ApiKey'
import Loading from '../../components/Loading';

const FavScreen = () => {

  const [playing, setPlaying] = useState(false);

  const [isLoadingImage, setLoadingImage] = useState(true);

  function onChangeState(state) {
    console.log(state);
  }

  return (
    <View style={styles.container}>
      {playing ?
        <YouTube
          apiKey={GOOGLE_API_KEY}
          videoId={'https://www.youtube.com/watch?v=hs0m_mcZeGQ'} // The YouTube video ID
          controls={1}
          play={playing}
          onChangeState={onChangeState}
          fullscreen={false}
          style={{ height: 300, alignSelf: 'stretch' }}
        />
        :
        <View style={{ height: 300, alignSelf: 'stretch' }}>
          <ImageBackground
            resizeMode='cover'
            source={{ uri: 'https://idsb.tmgrup.com.tr/ly/uploads/images/2021/09/08/thumbs/871x871/142774.jpg' }}
            onLoad={() => {
              setLoadingImage(false);
            }}
          >
            <LinearGradient
              style={{ height: 300, alignSelf: 'stretch' }}
              colors={[COLORS.black1, COLORS.transparent, COLORS.transparent, COLORS.black2]} />
          </ImageBackground>
          <TouchableOpacity
            activeOpacity={.7}
            style={{ position: 'absolute', alignSelf: 'center', bottom: '40%' }}
            onPress={() => {
              setPlaying(true);
            }}
          >
            <View>
              <FontAwesome5 size={50} name='play-circle' />
            </View>
          </TouchableOpacity>

        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default FavScreen;