import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList} from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import Title from './Title';
import store from '../../redux/store';
import { getGenres, getMovies } from '../../redux/actions';
import COLORS from '../../colors';
import TabBar from './TabBar';
import ListMovies from './ListMovies';

const Screen = ({ navigation }) => {

  const dispatch = useDispatch();

  const genres = useSelector(state => state.genres.dataGenres);

  const movies = useSelector(state => state.movies.dataMovies);

  function onTabPress(item){
    dispatch(getMovies(item.id));
  }

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getMovies(12));
  }, [])

  return (
    <View style={styles.container}>
      <Title />
      <SearchBar />
      <TabBar data={genres} onTabPress={onTabPress}/>
      <ListMovies data={movies}/>
    </View >
  );
}


const HomeScreen = () => {
  return (
    <Provider store={store}>
      <Screen />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;