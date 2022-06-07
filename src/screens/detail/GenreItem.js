import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import COLORS from '../../colors';

const GenreItem = ({ name }) => {

    return (
        <View style={styles.container}>
            <Text style={{ color: COLORS.white, margin: 10 }}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignSelf: "flex-start",
        backgroundColor:COLORS.gray3,
        borderRadius:50,
        paddingLeft:5,
        paddingRight:5,
        margin:5
    }
});

export default GenreItem;