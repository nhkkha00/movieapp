import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Image, BackHandler, FlatList, Animated } from 'react-native';
import COLORS from '../../res/color/colors';
import { GET_URL_DETAIL_PERSON, URL_IMG } from '../../connection/MethodApi';
import { ScrollView } from 'react-native-gesture-handler';
import { convertDateToString } from '../../utilities/convertDate';
import CastItem from './CastItem';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';


const CastScreen = ({ route, navigation }) => {

  const { itemMovie, cast, screen, current_page } = route.params;

  const [actors, setActors] = useState(cast);

  console.log(current_page);

  const [currentPage, setCurrentPage] = useState(current_page);

  const [ref, setRef] = useState(null);

  const arr = [];

  let totalPage = (actors.length - (actors.length % 10))/10; //37 -> 30 -> 3

  for(let i = 0 ; i < totalPage; i++){ // page 3 
    arr.push(actors.slice(i*10,(i+1)*10));
  }
  if(actors.length % 10 > 0){ //37-30 = 7 -> page 4 
    arr.push(actors.slice(actors.length - (actors.length % 10),actors.length));
    totalPage+=1; // page 4
  }

  function onChangePage(num) {
    setCurrentPage(num);
  }

  function onNext() {
    const num = currentPage + 1;
    setCurrentPage(num);
  }

  function onPrev() {
    if (currentPage > 1) {
      const num = currentPage - 1;
      setCurrentPage(num);
    }
  }

  useEffect(() => {
    ref?.scrollToOffset({
      offset: 0,
      animated: true
    });
  }, [currentPage]);

  useEffect(() => {

    const backAction = () => {
      navigation.push('Detail', { itemMovie });
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

  function onChangeText(text) {
    if (text) {
      const newData = cast.filter((item) => {
        const itemData = item.name ?
          item.name.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setActors(newData);
    } else {
      setActors(cast);
    }
  }

  console.log(actors.length)

  async function onViewMoreTouch(item) {
    const resActor = await axios.get(GET_URL_DETAIL_PERSON(item.id));
    const actor = resActor.data;
    const screen = 'CastScreen';
    navigation.push('DetailCast', { itemMovie, cast, actor, screen, current_page : currentPage });
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={(ref) => {
          setRef(ref);
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
        data={arr[currentPage - 1]}
        renderItem={({ item }) => {
          return <CastItem itemMovie={itemMovie} actorMovie={item} onViewMoreTouch={() => { onViewMoreTouch(item); }}
          />
        }} />
      {totalPage > 1 && 
        <Pagination
          pageCurrent={currentPage}
          pageLength={totalPage}
          onChangePage={onChangePage}
          onNext={onNext}
          onPrev={onPrev}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
  },
});

export default CastScreen;