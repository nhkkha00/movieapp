import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const DetailScreen = ({route}) => {

  const {itemId} = route.params;

  return (
    <View style={styles.container}>
      <Text>DetailScreen {itemId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default DetailScreen;