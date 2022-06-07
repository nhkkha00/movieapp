import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../colors';

const Tab = ({ item, onTabPress,colorSelect }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onTabPress}>
                <Text style={{
                    color: colorSelect,
                    fontSize: 18,
                    marginTop: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 10
                }}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Tab;