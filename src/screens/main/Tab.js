import React from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import COLORS from '../../colors';
import Foundation from 'react-native-vector-icons/Foundation'


const Tab = ({ text, active, onTouch }) => {

  return (
    
    <TouchableOpacity
    activeOpacity={.7}
            style={{
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                borderRadius: 10,
                backgroundColor: 'transparent'
            }}
            onPress={onTouch}
        >
            {
                <Foundation name={text} size={30} color={active ? COLORS.orange : COLORS.gray2} />
            }
        </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Tab;