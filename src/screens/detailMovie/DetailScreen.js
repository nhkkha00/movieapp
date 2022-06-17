import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, BackHandler, Dimensions, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import COLORS from '../../res/color/colors';
import store from '../../redux/store';
import DescriptionVideo from './DesciptionVideo';
import RelatedVideo from './RelatedVideo';
import axios from 'axios';
import { GET_URL_CAST_CREW, GET_URL_DETAIL_MOVIE, GET_URL_DETAIL_PERSON, GET_URL_VIDEO_MOVIE, URL_IMG } from '../../connection/MethodApi';
import { getSimilarMovies } from '../../redux/actions';
import Loading from '../../components/Loading';
import { GOOGLE_API_KEY } from '../../connection/ApiKey';
import Youtube from 'react-native-youtube';
import { useDeviceOrientation } from '@react-native-community/hooks'
import { createStackNavigator } from '@react-navigation/stack';
import CastScreen from '../detailCast/CastScreen';
import DetailCastScreen from '../detailCast/DetailCastScreen';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'




const Screen = ({ route, navigation }) => {

  const { itemMovie } = route.params;

  const { landscape } = useDeviceOrientation();

  const dim = Dimensions.get("screen");

  const directionsScreen =
    landscape ? { flexDirection: 'row' } : { flexDirection: 'column' };

  const directionsDetail =
    landscape ? { width: dim.width / 2, height: '100%' } : { alignSelf: 'stretch', height: '100%' };

  const directionsVideo =
    landscape ? { width: dim.width / 2, height: '100%' } : { alignSelf: 'stretch', height: 300 };

  const dispatch = useDispatch();

  const [ref, setRef] = useState();

  const [urlVideo, setUrlVideo] = useState('');

  const genres = useSelector(state => state.genres.dataGenres);

  const similarMovie = useSelector(state => state.similarMovies.dataSimilarMovies);

  const [movie, setMovie] = useState('');

  const [cast, setCast] = useState([]);

  const [playing, setPlaying] = useState(false);

  const [loadingImage, setLoadingImage] = useState(true);

  const image_source = `${URL_IMG}/w500${itemMovie.poster_path}`;


  useEffect(() => {

    const backAction = () => {
      navigation.navigate('Main', {
        screen: 'Home',
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    }
  }, []);

  function onBackButton() {
    navigation.navigate('Main', {
      screen: 'Home',
    });
  }


  async function onCastTouch(id) {
    const resActor = await axios.get(GET_URL_DETAIL_PERSON(id));
    const actor = resActor.data;
    const screen = 'Detail';
    navigation.push('DetailCast', { itemMovie, cast, actor, screen });
  }

  async function onListCastTouch() {
    const screen = 'Detail';
    const current_page = 1;
    navigation.push('Cast', { itemMovie, cast, screen, current_page });
  }

  async function onPressRelatedMovie(itemMovie) {
    // ref.scrollTo({
    //   x: 0,
    //   y: 0,
    //   animated: true
    // });
    navigation.replace('Detail', { itemMovie });
  }



  async function getDataMovie() {
    const resMovie = await axios.get(GET_URL_DETAIL_MOVIE(itemMovie.id));
    const resVideo = await axios.get(GET_URL_VIDEO_MOVIE(itemMovie.id));
    const resCast = await axios.get(GET_URL_CAST_CREW(itemMovie.id));
    //don't have videos trailer
    if (resVideo.data.results.length === 0) {
      setVideoDeleted(true);
      setUrlVideo('Deleted');
    } else {
      setUrlVideo(resVideo.data.results[0].key);
    }
    setCast(resCast.data.cast);
    setMovie(resMovie.data);
    dispatch(getSimilarMovies(itemMovie.id));

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
    console.log(state.state);
    switch (state.state) {
      case 'ended':
        setPlaying(false);
        break;
    }
  }

  if (urlVideo === '' ||
    cast.length === 0 ||
    genres.length === 0 ||
    movie.length === 0 ||
    similarMovie.length === 0
  ) return <Loading />;
  return (
    <View style={[styles.container, directionsScreen]}>
      {
        playing ?
          <View style={[directionsVideo, { justifyContent: 'center', alignItems: 'center' }]}>
            {videoDeleted ?
              <Text style={{ color: COLORS.white }}>This video is not available</Text>
              :
              <Youtube
                apiKey={GOOGLE_API_KEY}
                videoId={urlVideo} // The YouTube video ID
                onError={onErrorVideo}
                onReady={onReady}
                play={playing}
                onChangeState={onChangeState}
                controls={1}
                fullscreen={false}
                style={directionsVideo}
              />
            }
          </View>
          :
          <View style={[directionsVideo,{ justifyContent: 'center', alignItems: 'center' }]}>
            <ImageBackground
              resizeMode='cover'
              style={directionsVideo}
              source={{ uri: image_source }}
              onLoad={() => {
                setLoadingImage(false);
              }}
            >
              <LinearGradient
                style={ directionsVideo}
                colors={[COLORS.black1, COLORS.transparent, COLORS.transparent, COLORS.black2]} />
            </ImageBackground>
            <TouchableOpacity
              activeOpacity={.7}
              style={{ position: 'absolute', alignSelf: 'center', bottom: '40%' }}
              onPress={() => {
                setPlaying(true);
              }}
            >
              <View style={styles.iconPlay}>
                <FontAwesome
                color={COLORS.pink}
                style={{marginLeft:5}}
                size={35} name='play' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.7}
              style={{ position: 'absolute', top: 20, left: 20 }}
              onPress={onBackButton}>
              <View>
                <FontAwesome size={35} color={COLORS.white} name='angle-left' />
              </View>
            </TouchableOpacity>
          </View>
      }
      <ScrollView
        ref={(ref => setRef(ref))}
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={directionsDetail}
      >
        <DescriptionVideo
          itemMovie={itemMovie}
          cast={cast}
          runtime={movie.runtime}
          genres={genres}
          onCastTouch={onCastTouch}
          onListCastTouch={onListCastTouch} />
        <RelatedVideo itemVideo={itemMovie} data={similarMovie} onPressRelatedMovie={onPressRelatedMovie} />
      </ScrollView>
    </View>
  )
}


const Stack = createStackNavigator();

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.mainBg
  },
  textVideo: {
    color: COLORS.white,
    fontFamily: 'lato_regular',
  },
  iconPlay:{
    backgroundColor:COLORS.gray3,
    borderRadius:50,
    width:65,
    height:65,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default DetailScreen;