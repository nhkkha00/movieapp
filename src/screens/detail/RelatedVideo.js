import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet,FlatList,Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { GET_SIMILAR_MOVIE } from '../../connection/MethodApi';

const RelatedVideo = ({id}) => {

  const [similarMovie, setSimilarMovie] = useState([]);

  useEffect(() => {
      const res = axios.get(GET_SIMILAR_MOVIE(id)).then(res => {
        setSimilarMovie(res.data.results);
    })
    .catch(error => console.log(error));
  })

  return (
    <View style={styles.container}>
      <FlatList
        data={setSimilarMovie}
        horizontal
        renderItem={({item})=>{
          <Text style={{color:'white'}}>{item}</Text>
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height:200
  }
});

export default RelatedVideo;