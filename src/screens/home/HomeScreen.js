import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Animated } from 'react-native';
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

  const genres = useSelector(state => state.genres.dataGenres);

  const movies = useSelector(state => state.movies.dataMovies);

  const [loading, setLoading] = useState(false);

  //tab genres click
  function onTabPress(item) {
    setLoading(true);
    dispatch(getMovies(item.id));
  }

  //click on item movie
  async function onTouchMovie(item) {
    //get related movie
    dispatch(getSimilarMovies(item.id));

    const resVideo = await axios.get(GET_URL_DETAIL_MOVIE(item.id));
    navigation.navigate('Detail', {item});
  }

  //loading genres
  useEffect(() => {
    if (genres.length > 0) {
      setLoading(false);
      dispatch(getMovies(genres[0].id));
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

  return (
    <View style={styles.container}>
      <Title />
      <SearchBar />
      <TabBar data={genres} onTabPress={onTabPress} />
      {loading ? <Loading /> : <ListMovies data={movies} onTouchMovie={onTouchMovie} />}
    </View >
  );
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