import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import COLORS from '../../colors';

const Tab = ({ item }) => {

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
    text: {
        color: COLORS.white,
        fontSize: 18,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    }
});

export default Tab;