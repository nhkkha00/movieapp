import React from 'react';
import { View, StyleSheet,FlatList,Text } from 'react-native';

const RelatedVideo = ({data}) => {

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        renderItem={({item})=>{
          <Text style={{margin:10,color:'white'}}>{item.title}</Text>
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height:300
  }
});

export default RelatedVideo;