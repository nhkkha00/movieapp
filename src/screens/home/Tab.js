import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../colors';

const Tab = ({ item, onTabPress, colorSelect }) => {

    return (

        <TouchableOpacity activeOpacity={.7} style={styles.container} onPress={onTabPress}>
            <Text style={{
                color: colorSelect,
                fontSize: 18,
                marginTop: 10,
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 10
            }}>{item.name}</Text>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Tab;