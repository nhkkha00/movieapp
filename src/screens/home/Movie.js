import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import COLORS from '../../colors';
import { URL_IMG } from '../../connection/MethodApi';

const Movie = ({ item, width, height, marginTop }) => {


    const image_source = `${URL_IMG}/w200${item.poster_path}`;

    return (
        <View>
            <Image style={{
                width: width,
                height: height,
                borderRadius: 10,
                marginLeft: 10,
                marginBottom: 10,
                marginRight: 10,
                marginTop: marginTop
                }}
                resizeMode='cover'
                source={{uri:image_source}} />        
            <Text style={{
                width: width,
                color: COLORS.white,
                marginLeft: 10,
                textAlign: 'auto',
            }}>
                {item.title}
            </Text>
        </View>
    );
}

export default Movie;