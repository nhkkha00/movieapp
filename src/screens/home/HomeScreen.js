import React, { useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import Title from './Title';
import store from '../../redux/store';
import { getGenres } from '../../redux/actions';
import COLORS from '../../colors';
import TabBar from './TabBar';

const Screen = ({ navigation }) => {

  const dispatch = useDispatch();

  const genres = useSelector(state => state.dataGenres);

  useEffect(() => {
    dispatch(getGenres());
  }, [])

  return (
    <View style={styles.container}>
      <Title />
      <SearchBar />
      <TabBar data={genres} />
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