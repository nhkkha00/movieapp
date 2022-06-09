import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import COLORS from '../../colors';
import VideoMovie from './VideoMovie';
import store from '../../redux/store';
import Description from './Desciption';
import RelatedVideo from './RelatedVideo';
import axios from 'axios';
import { GET_URL_VIDEO } from '../../connection/MethodApi';


const Screen = ({ route, navigation }) => {

  const [ref, setRef] = useState();

  const { item, keyVideo } = route.params;

  const genres = useSelector(state => state.genres.dataGenres);

  const similarMovie = useSelector(state => state.similarMovies.dataSimilarMovies);

  async function onPressRelatedMovie(item) {
    const res = await axios.get(GET_URL_VIDEO(item.id));
    navigation.navigate('Detail', {
      item,
      keyVideo: res.data.results[0].key
    });
    ref.scrollTo({
      x: 0,
      y: 0,
      animated: true
    });
  }

  return (
    <ScrollView
      ref={(ref => setRef(ref))}
      overScrollMode='never'
      showsVerticalScrollIndicator={false}
    >
      <VideoMovie keyVideo={keyVideo} />
      <Description item={item} genres={genres} />
      <RelatedVideo itemVideo={item} data={similarMovie} onPressRelatedMovie={onPressRelatedMovie} />
    </ScrollView>
  )
}


const DetailScreen = ({ route, navigation }) => {

  return (
    <Provider store={store}>
      <Screen route={route} navigation={navigation} />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBg
  },
});

export default DetailScreen;