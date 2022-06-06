import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../colors';

const Tab = ({ item, onTabPress }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onTabPress}>
                <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
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