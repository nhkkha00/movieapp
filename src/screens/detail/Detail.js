import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView } from 'react-native';
import COLORS from '../../colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { convertDateToString } from '../../utilities/convertDate';
import GenreItem from './GenreItem';
import { Provider, useSelector } from 'react-redux';
import store from '../../redux/store';
import Video from './Video';
import RelatedVideo from './RelatedVideo';

import { GET_SIMILAR_MOVIE } from '../../connection/MethodApi';
import API_KEY from '../../connection/ApiKey';
import axios from 'axios';
import Loading from '../../components/Loading';



const renderItem = ({ item }) => {
    return (
        <Text>{item.title}</Text>
    )
}

const Screen = ({ item, navigation }) => {

    const genres = useSelector(state => state.genres.dataGenres);

    const similarMovie = useSelector(state => state.similarMovies.dataSimilarMovies);

    function onPressBack(){
        navigation.navigate('Home');
    }

    function onPressRelatedMovie(item){
        navigation.push('Detail',{item});
    }

    return (
        <View>
            {similarMovie.length < 0 ? <Loading /> :
                <ScrollView
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                >
                    <Video item={item} onPressBack={onPressBack} />
                    <View style={styles.containerDetail} >
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconSmall}>
                                <Ionicons name='time-outline' color={COLORS.gray} size={20} />
                            </View>

                            <Text style={styles.textGray}>152 mins</Text>
                            <View style={styles.iconSmall}>
                                <Ionicons name='star' color={COLORS.gray} size={20} />
                            </View>
                            <Text style={styles.textGray}>{item.vote_average} (IMDb)</Text>
                        </View>
                        <View style={styles.dash}></View>


                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={styles.section}>Release date</Text>
                                <Text style={styles.textGray}>{convertDateToString(item.release_date)}</Text>
                            </View>
                            <View style={{ flex: 0.6 }}>
                                <Text style={styles.section}>Genre</Text>
                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 5 }}>
                                    {
                                        item.genre_ids.map((i) => {
                                            const genreName = genres.filter(g => g.id === i);
                                            return <GenreItem key={i} name={genreName[0].name} />
                                        })
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={styles.dash}></View>

                        <Text style={styles.section}>Synopsis</Text>

                        <Text style={styles.textGray}>{item.overview}</Text>

                        <View style={styles.dash}></View>

                        <Text style={styles.section}>Related Movies</Text>

                        <RelatedVideo itemVideo={item} data={similarMovie} onPressRelatedMovie={onPressRelatedMovie} />
                    </View>
                </ScrollView>
            }
        </View>
    )
}





const Detail = ({ item, navigation }) => {
    return (
        <Provider store={store}>
            <Screen item={item} navigation={navigation}/>
        </Provider>
    )
}

const styles = StyleSheet.create({
    containerDetail: {
        margin: 10
    },
    title: {
        color: COLORS.white,
        fontSize: 24,
        lineHeight: 40
    },
    textGray: {
        color: COLORS.gray,
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    iconSmall: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    dash: {
        height: 1,
        backgroundColor: COLORS.gray3,
        marginTop: 20,
        marginBottom: 20
    },
    section: {
        color: COLORS.white,
        fontSize: 20,
        marginBottom: 10
    }
});

export default Detail;