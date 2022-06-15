
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, Text } from 'react-native';
import { URL_IMG } from '../../connection/MethodApi';
import COLORS from '../../res/color/colors';
import { getRandomValues } from '../../utilities/randomValues';

const ListMovies = ({ data,numColumn, width, heightList, onTouchMovie }) => {

    const renderItem = ({ item, index }) => {

        // const randomHeight = getRandomValues(heightList);

        let height = 200;

        if(index % 2 === 0 ){
            height = 220;
        }
        if(index % 3 === 0){
            height = 180;
        }

        const image_source = `${URL_IMG}/w200${item.poster_path}`;

        return (
            <TouchableOpacity style={{flex: 1,marginBottom:10 }} activeOpacity={.7} onPress={()=>{
                onTouchMovie(item);
            }}>
                <Image style={{
                    alignSelf: 'stretch',
                    width: width,
                    height: height,
                    borderRadius: 10,
                    margin:10
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
        )
    }

    return (
        <FlatList
            overScrollMode='never'
            numColumns={numColumn}
            style={{ alignSelf: 'stretch' }}
            contentContainerStyle={{
                paddingHorizontal: 10,
                alignSelf: 'stretch'
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
        />
    );
}


export default ListMovies;