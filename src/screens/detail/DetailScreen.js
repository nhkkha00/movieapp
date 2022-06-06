import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import COLORS from '../../colors';
import Detail from './Detail';

const DetailScreen = ({ route, navigation }) => {

  const { item } = route.params;

  return (
    <View style={styles.container}>
        <Detail item={item} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBg
  }
});

export default DetailScreen;