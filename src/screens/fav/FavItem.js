import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { URL_IMG } from '../../connection/MethodApi';
import COLORS from '../../res/color/colors';

const FavItem = ({ item, index, landscape, onTouchMovie }) => {

    // const randomHeight = getRandomValues(heightList);

    let height = 200;

    let width = landscape ? 180 : 170;

    if (index % 2 === 0) {
        height = 220;
    }
    if (index % 3 === 0) {
        height = 180;
    }

    const image_source = `${URL_IMG}/w200${item.poster_path}`;

    return (
        <TouchableOpacity style={{ flex: 1, marginBottom: 10 }} activeOpacity={.7} onPress={() => {
            onTouchMovie(item);
        }}>
            <Image style={{
                alignSelf: 'stretch',
                width: width,
                height: height,
                borderRadius: 10,
                margin: 10
            }}
                resizeMode='cover'
                source={{ uri: image_source }} />
            <Text
                numberOfLines={1}
                style={{
                    color: COLORS.white,
                    marginLeft: 10,
                    width: width,
                    textAlign: 'auto',
                    fontFamily: 'lato_regular'
                }}>
                {item.title}
            </Text>
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

export default FavItem;