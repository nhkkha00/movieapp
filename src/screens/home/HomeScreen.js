import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Animated, Dimensions } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import Title from './Title';
import store from '../../redux/store';
import { getGenres, getMovies, getSimilarMovies, getVideoMovie } from '../../redux/actions';
import COLORS from '../../res/color/colors';
import TabBar from './TabBar';
import ListMovies from './ListMovies';
import Loading from '../../components/Loading';
import axios from 'axios';
import { GET_URL_DETAIL_MOVIE } from '../../connection/MethodApi';

const Screen = ({ navigation }) => {

  const dispatch = useDispatch();

  const scrollX = useRef(new Animated.Value(0)).current;

  const genres = useSelector(state => state.genres.dataGenres);

  const movies = useSelector(state => state.movies.dataMovies);

  const [loading, setLoading] = useState(false);

  const ref = useRef();

  const [dataGenres, setDataGenres] = useState([]);

  const { width, height } = Dimensions.get('screen');

  //tab genres click
  const onTabPress = useCallback((item,itemIndex,containerRef)=> {
    setLoading(true);
    dispatch(getMovies(item.object.id));
  });

  //click on item movie
  async function onTouchMovie(item) {
    //get related movie
    dispatch(getSimilarMovies(item.id));

    const resVideo = await axios.get(GET_URL_DETAIL_MOVIE(item.id));
    navigation.navigate('Detail', { item });
  }

  //loading genres
  useEffect(() => {
    if (genres.length > 0) {
      const data = genres.map((i) => ({
        key: i.id,
        object: i,
        ref: createRef()
      }));
      setDataGenres(data);
      dispatch(getMovies(genres[0].id));
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [genres])

  //loading movies
  useEffect(() => {
    if (movies.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [movies]);

  if (dataGenres.length <= 0) return <Loading />
  return (
    <View style={styles.container}>
      <Title />
      <SearchBar />
      <TabBar width={width} data={dataGenres} onTabPress={onTabPress} />
      {loading ? <Loading /> : <ListMovies scrollX={scrollX} data={movies} onTouchMovie={onTouchMovie} />}
    </View>
  )
}


const HomeScreen = ({ navigation }) => {
  return (
    <Provider store={store}>
      <Screen navigation={navigation} />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;