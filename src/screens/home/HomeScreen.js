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
import Pagination from '../../components/Pagination';
import { ScrollView } from 'react-native-gesture-handler';


const Screen = ({ navigation }) => {

  const dispatch = useDispatch();

  const { landscape } = useDeviceOrientation();

  const orientationMenu = landscape ? false : true;

  const genres = useSelector(state => state.genres.dataGenres);

  const movies = useSelector(state => state.movies.dataMovies);

  const total_pages = useSelector(state => state.movies.totalPages);

  const [dataMovie, setDataMovie] = useState([]);

  const [loading, setLoading] = useState(false);

  const ref = useRef();

  const [dataGenres, setDataGenres] = useState([]);

  const { width, height } = Dimensions.get('screen');

  const [currentGenre, setCurrentGenre] = useState(0);

  const [pageCurrent, setPageCurrent] = useState(1);

  const [allPage, setAllPages] = useState(0);

  //tab genres click
  const onTabPress = useCallback((item, itemIndex, containerRef) => {
    setCurrentGenre(itemIndex);
    //reset page
    setPageCurrent(1);
    setLoading(true);
    dispatch(getMovies(item.object.id, pageCurrent));
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
      dispatch(getMovies(genres[currentGenre].id));
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [genres])

  //loading movies
  useEffect(() => {
    if (movies.length > 0 && total_pages > 0) {
      if (total_pages > 500) {
        setAllPages(500);
      } else {
        setAllPages(total_pages);
      }
      setPageCurrent(pageCurrent);
      setDataMovie(movies);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [movies]);


  function onChangeText(text) {
    if (text) {
      const newData = dataMovie.filter((item) => {
        const itemData = item.title ?
          item.title.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setDataMovie(newData);
    } else {
      setDataMovie(movies);
    }
  }

  function onChangePage(num) {
    setPageCurrent(num);
    setLoading(true);
    dispatch(getMovies(dataGenres[currentGenre].object.id, num));
  }

  function onNext() {
    const num = pageCurrent + 1;
    setPageCurrent(num);
    setLoading(true);
    dispatch(getMovies(dataGenres[currentGenre].object.id, num));
  }

  function onPrev() {
    if (pageCurrent > 1) {
      const num = pageCurrent - 1;
      setPageCurrent(num);
      setLoading(true);
      dispatch(getMovies(dataGenres[currentGenre].object.id, num));
    }
  }

  if (dataGenres.length <= 0) return <Loading />
  return (
    <View style={styles.container}>
      {landscape ?
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ width: '20%', height: '100%' }}>
            <TabBar orientation={orientationMenu} width={width} data={dataGenres} onTabPress={onTabPress} />
          </View>
          <View style={{ width: 1, height: '100%', backgroundColor: COLORS.gray3 }}></View>
          <View style={{ width: '80%', height: '100%' }}>
            <SearchBar placeholder='Sherlock Holmes' onChangeText={onChangeText} />
            {loading ? <Loading />
              :
              <ScrollView
                style={{ flex: 1 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
              >
                <ListMovies
                  data={dataMovie}
                  onTouchMovie={onTouchMovie}
                  width={180}
                  numColumn={3}
                // heightList={[180,190,200,210,220,230,240,250,260,270,280]}
                />
                <Pagination
                  pageCurrent={pageCurrent}
                  onChangePage={onChangePage}
                  onNext={onNext}
                  onPrev={onPrev}
                  pageLength={allPage} />
              </ScrollView>
            }
          </View>
        </View>
        :
        <View style={{ flex: 1 }}>
          <View>
            <Title />
            <SearchBar placeholder='Sherlock Holmes' onChangeText={onChangeText} />
            <TabBar orientation={orientationMenu} width={width} data={dataGenres} onTabPress={onTabPress} />
          </View>
          {loading ? <Loading />
            :
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              overScrollMode='never'
              style={{ flex: 1 }}>
              <ListMovies
                data={dataMovie}
                onTouchMovie={onTouchMovie}
                width={170}
                numColumn={2}
              // heightList={[180,190,200,210,220,230,240,250,260,270,280]}
              />
              <Pagination
                pageCurrent={pageCurrent}
                onChangePage={onChangePage}
                onNext={onNext}
                onPrev={onPrev}
                pageLength={allPage} />
            </ScrollView>
          }
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