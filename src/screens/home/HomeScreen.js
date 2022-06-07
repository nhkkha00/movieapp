import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import Title from './Title';
import store from '../../redux/store';
import { getGenres, getMovies, getSimilarMovies } from '../../redux/actions';
import COLORS from '../../colors';
import TabBar from './TabBar';
import ListMovies from './ListMovies';
import Loading from '../../components/Loading';

const Screen = ({ navigation }) => {

  const dispatch = useDispatch();

  const genres = useSelector(state => state.genres.dataGenres);

  const movies = useSelector(state => state.movies.dataMovies);

  const [loading,setLoading] = useState(false);

  //tab genres click
  function onTabPress(item) {
    setLoading(true);
    dispatch(getMovies(item.id));
  }

  //click on item movie
  function onTouchMovie(item){
    dispatch(getSimilarMovies(item.id));
    navigation.navigate('Detail',{item});
  }

  //loading genres
  useEffect(() => {
    if (genres.length > 0) {
      setLoading(false);
      dispatch(getMovies(genres[0].id));
    }else{
      setLoading(true);
    }
  },[genres])

  //loading movies
  useEffect(()=>{
    if (movies.length > 0) {
      setLoading(false);
    }else{
      setLoading(true);
    }
  },[movies]);

  return (
    <View style={styles.container}>
      <Title />
      <SearchBar />
      <TabBar data={genres} onTabPress={onTabPress} />
      { loading ? <Loading /> : <ListMovies data={movies} onTouchMovie={onTouchMovie} />}
    </View >
  );
}


const HomeScreen = ({navigation}) => {
  return (
    <Provider store={store}>
      <Screen navigation={navigation}/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;