import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../../colors';
import Foundation from 'react-native-vector-icons/Foundation'
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const Tab = ({ text, active, onTouch }) => {

  let colorFirst = COLORS.gray4;
  let colorSecond = COLORS.gray4;

  if (active) {
    colorFirst = COLORS.red;
    colorSecond = COLORS.white;
  }

  return (
    <TouchableOpacity activeOpacity={.7} onPress={onTouch}>
      <MaskedView
        maskElement={
          <View style={styles.icon}>
            <Foundation name={text} size={30} color={COLORS.white} />
          </View>
        }
      >
        <LinearGradient
          style={styles.colorGradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          colors={[colorFirst,colorSecond]} />
      </MaskedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: COLORS.transparent
  },
  colorGradient: {
    width: 60,
    height: 60
  }
});

export default Tab;