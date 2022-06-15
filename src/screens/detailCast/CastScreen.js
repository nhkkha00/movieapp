import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, BackHandler, FlatList } from 'react-native';
import COLORS from '../../res/color/colors';
import { GET_URL_DETAIL_PERSON, URL_IMG } from '../../connection/MethodApi';
import { ScrollView } from 'react-native-gesture-handler';
import { convertDateToString } from '../../utilities/convertDate';
import CastItem from './CastItem';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';


const CastScreen = ({ route, navigation }) => {

  const { itemMovie, cast, screen } = route.params;

  const [actors,setActors] = useState(cast);


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

  function onChangeText(text){
    if(text){
      const newData = actors.filter((item)=>{
        const itemData = item.name ?
            item.name.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setActors(newData);
    }else{
      setActors(cast);
    }
  }

  async function onViewMoreTouch(item) {
    const resActor = await axios.get(GET_URL_DETAIL_PERSON(item.id));
    const actor = resActor.data;
    const screen = 'CastScreen';
    navigation.push('DetailCast', { itemMovie, cast, actor, screen });
  }

  return (
    <View style={styles.container}>
      <SearchBar placeholder={'Search'} onChangeText={text => {
        onChangeText(text);
      }} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
        data={actors}
        renderItem={({ item }) => {
          return <CastItem itemMovie={itemMovie} actorMovie={item} onViewMoreTouch={() => { onViewMoreTouch(item); }}
          />
        }} />
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