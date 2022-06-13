import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, BackHandler } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import COLORS from '../../res/color/colors';
import VideoMovie from './VideoMovie';
import store from '../../redux/store';
import DescriptionVideo from './DesciptionVideo';
import RelatedVideo from './RelatedVideo';
import axios from 'axios';
import { GET_URL_CAST_CREW, GET_URL_DETAIL_MOVIE, GET_URL_VIDEO_MOVIE } from '../../connection/MethodApi';
import { getSimilarMovies } from '../../redux/actions';
import Loading from '../../components/Loading';

const VideoDeleted = () => {
  return (
    <View style={styles.deleteVideo}>
      <Text style={styles.textVideo}>This video has been removed</Text>
    </View>
  )
}

const Screen = ({ route, navigation }) => {

  const dispatch = useDispatch();

  const [ref, setRef] = useState();

  const { item } = route.params;

  const [urlVideo, setUrlVideo] = useState('');

  const genres = useSelector(state => state.genres.dataGenres);

  const similarMovie = useSelector(state => state.similarMovies.dataSimilarMovies);

  const [movie,setMovie] = useState(''); 

  const [cast,setCast] = useState([]);

  async function onPressRelatedMovie(item) {
    // ref.scrollTo({
    //   x: 0,
    //   y: 0,
    //   animated: true
    // });
    navigation.push('Detail', { item });
  }

  async function getDataMovie() {
    const resMovie = await axios.get(GET_URL_DETAIL_MOVIE(item.id));
    const resVideo = await axios.get(GET_URL_VIDEO_MOVIE(item.id));
    const resCast = await axios.get(GET_URL_CAST_CREW(item.id));
    //don't have videos trailer
    if (resVideo.data.results.length === 0) {
      setVideoDeleted(true);
      setUrlVideo('Deleted');
    } else {
      setUrlVideo(resVideo.data.results[0].key);
    }
    setCast(resCast.data.cast);
    setMovie(resMovie.data);
    dispatch(getSimilarMovies(item.id));
  }

  useEffect(() => {
    getDataMovie();
  }, [])

  const [videoDeleted, setVideoDeleted] = useState(false);

  function onReady() {
    console.log('onReady');
    setVideoDeleted(false);
  }

  function onErrorVideo(e) {
    if (e.error === "NOT_PLAYABLE") {
      setVideoDeleted(true);
    }
    console.log(e);
  }

  if (urlVideo === '' || cast.length === 0) return <Loading />;
  return (
    <View style={styles.container}>
      {videoDeleted ?
        <View style={{
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.mainBg
        }}>
          <Text style={{ color: COLORS.white }}>This video is not available</Text>
        </View>
        :
        <VideoMovie
          keyVideo={urlVideo}
          onErrorVideo={onErrorVideo}
          onReady={onReady} />
      }
      <ScrollView
        ref={(ref => setRef(ref))}
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
      >
        <DescriptionVideo item={item} cast={cast} runtime={movie.runtime} genres={genres} />
        <RelatedVideo itemVideo={item} data={similarMovie} onPressRelatedMovie={onPressRelatedMovie} />
      </ScrollView>
    </View >
  )
}


const DetailScreen = ({ route, navigation }) => {

  useEffect(() => {

    const backAction = () => {
      navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Provider store={store}>
      <Screen route={route} navigation={navigation} />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.mainBg
  },
  deleteVideo: {
    alignSelf: 'stretch',
    height: 300,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textVideo: {
    color: COLORS.white,
    fontFamily: 'lato_regular'
  }
});

export default DetailScreen;