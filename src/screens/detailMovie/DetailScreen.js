import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, BackHandler, Dimensions } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import COLORS from '../../res/color/colors';
import store from '../../redux/store';
import DescriptionVideo from './DesciptionVideo';
import RelatedVideo from './RelatedVideo';
import axios from 'axios';
import { GET_URL_CAST_CREW, GET_URL_DETAIL_MOVIE, GET_URL_VIDEO_MOVIE } from '../../connection/MethodApi';
import { getSimilarMovies } from '../../redux/actions';
import Loading from '../../components/Loading';
import { GOOGLE_API_KEY } from '../../connection/ApiKey';
import Youtube from 'react-native-youtube';

import {useDeviceOrientation} from '@react-native-community/hooks'



const Screen = ({ route, navigation }) => {

  const { landscape } = useDeviceOrientation();

  const dim = Dimensions.get("screen");

  const dispatch = useDispatch();

  const [ref, setRef] = useState();

  const { item } = route.params;

  const [urlVideo, setUrlVideo] = useState('');

  const genres = useSelector(state => state.genres.dataGenres);

  const similarMovie = useSelector(state => state.similarMovies.dataSimilarMovies);

  const [movie, setMovie] = useState('');

  const [cast, setCast] = useState([]);

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

  function onChangeState(state) {

  }


  const directionsScreen =
  landscape ? { flexDirection: 'row' } : { flexDirection: 'column' };

  const directionsDetail =
  landscape ? { width: dim.width / 2,height: '100%' } : { alignSelf:'stretch', height:'100%' };

  const directionsVideo =
  landscape ? { width: dim.width / 2, height:'100%' } : { alignSelf:'stretch',height: 300 };


  if (urlVideo === '' || cast.length === 0) return <Loading />;

  return (
    <View style={[styles.container, directionsScreen]}>
      {videoDeleted ?
        <View style={directionsVideo}>
          <Text style={{ color: COLORS.white }}>This video is not available</Text>
        </View>
        :
        <Youtube
          apiKey={GOOGLE_API_KEY}
          videoId={urlVideo} // The YouTube video ID
          onError={onErrorVideo}
          onReady={onReady}
          onChangeState={onChangeState}
          controls={1}
          loop={true}
          fullscreen={false}
          style={directionsVideo}
        />
      }
      <ScrollView
        ref={(ref => setRef(ref))}
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
        style={directionsDetail}
      >
        <DescriptionVideo
          item={item}
          cast={cast}
          runtime={movie.runtime}
          genres={genres}
          navigation={navigation} />
        <RelatedVideo itemVideo={item} data={similarMovie} onPressRelatedMovie={onPressRelatedMovie} />
      </ScrollView>
    </View>
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
    backgroundColor:COLORS.mainBg
  },
  textVideo: {
    color: COLORS.white,
    fontFamily: 'lato_regular',
  },
});

export default DetailScreen;