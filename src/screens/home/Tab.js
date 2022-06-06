import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import COLORS from '../../colors';

const Tab = ({item}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{item.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center' 
    },
    text:{
        color: COLORS.white,
        fontSize: 18,
        margin: 10
    }
});

export default Tab;