import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Animated, Dimensions } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar';
import Title from './Title';
import store from '../../redux/store';
import { getGenres, getMovies, getSimilarMovies, getVideoMovie } from '../../redux/actions';
import COLORS from '../../res/color/colors';
import TabBar from './TabBar';
import ListMovies from './ListMovies';
import Loading from '../../components/Loading';
import axios from 'axios';
import { GET_URL_DETAIL_MOVIE } from '../../connection/MethodApi';
import { useDeviceOrientation } from '@react-native-community/hooks'


const Screen = ({ navigation }) => {

  const dispatch = useDispatch();

  const { landscape } = useDeviceOrientation();

  const orientationMenu = landscape ? false : true;

  const genres = useSelector(state => state.genres.dataGenres);

  const movies = useSelector(state => state.movies.dataMovies);

  const [dataMovie,setDataMovie] = useState([]);

  const [loading, setLoading] = useState(false);

  const ref = useRef();

  const [dataGenres, setDataGenres] = useState([]);

  const { width, height } = Dimensions.get('screen');

  //tab genres click
  const onTabPress = useCallback((item, itemIndex, containerRef) => {
    setLoading(true);
    dispatch(getMovies(item.object.id));
  });

  //click on item movie
  async function onTouchMovie(item) {
    //get related movie
    dispatch(getSimilarMovies(item.id));
    navigation.navigate('DetailStack',
      {
        screen: 'Detail',
        params: { itemMovie: item }
      });
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
      setDataMovie(movies);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [movies]);


  function onChangeText(text){
    if(text){
      const newData = dataMovie.filter((item)=>{
        const itemData = item.title ?
            item.title.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setDataMovie(newData);
    }else{
      setDataMovie(movies);
    }
  }

  if (dataGenres.length <= 0) return <Loading />
  return (
    <View style={styles.container}>
      {landscape ?
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ width: '20%', height: '100%'}}>
            <TabBar orientation={orientationMenu} width={width} data={dataGenres} onTabPress={onTabPress} />
          </View>
          <View style={{ width: 1, height: '100%', backgroundColor: COLORS.gray3 }}></View>
          <View style={{ width: '80%', height: '100%' }}>
            <SearchBar placeholder='Sherlock Holmes' onChangeText={onChangeText}/>
            {loading ? <Loading />
              : <ListMovies
                data={dataMovie}
                onTouchMovie={onTouchMovie}
                width={180}
                numColumn={3}
                // heightList={[180,190,200,210,220,230,240,250,260,270,280]}
                 />}
          </View>
        </View>
        :
        <View style={{ flex: 1 }}>
          <View>
            <Title />
            <SearchBar placeholder='Sherlock Holmes' onChangeText={onChangeText}/>
            <TabBar orientation={orientationMenu} width={width} data={dataGenres} onTabPress={onTabPress} />
          </View>
          {loading ? <Loading />
            : <ListMovies
              data={dataMovie}
              onTouchMovie={onTouchMovie}
              width={170}
              numColumn={2}
              // heightList={[180,190,200,210,220,230,240,250,260,270,280]}
               />}
        </View>
      }
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
    flex: 1
  },
});

export default HomeScreen;