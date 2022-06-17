import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import COLORS from '../../res/color/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { convertDateToString } from '../../utilities/convertDate';
import { URL_IMG } from '../../connection/MethodApi';




const GenreItem = ({ name }) => {

    return (
        <View style={styles.containerGenresItem}>
            <Text style={{ color: COLORS.white, margin: 10, fontFamily: 'lato_regular' }}>{name}</Text>
        </View>
    );
}


const DescriptionVideo = ({ itemMovie, cast, runtime, genres, onCastTouch, onListCastTouch }) => {

    const [num, setNumLine] = useState(2);

    const [visibility, setVisibility] = useState(false);

    const castLess = cast.slice(0, 3);

    return (
        <View style={styles.container}>
            <View style={styles.containerDetail} >
                <Text style={styles.title}>{itemMovie.title}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.iconSmall}>
                        <Ionicons name='time-outline' color={COLORS.gray} size={20} />
                    </View>
                    <Text style={styles.textGray}>{runtime} mins</Text>
                    <View style={styles.iconSmall}>
                        <Ionicons name='star' color={COLORS.gray} size={20} />
                    </View>
                    <Text style={styles.textGray}>{itemMovie.vote_average} (IMDb)</Text>

                </View>
                <View style={styles.dash}></View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.section}>Release date</Text>
                        <Text style={styles.textGray}>{itemMovie.release_date}</Text>
                    </View>
                    <View style={{ flex: 0.6 }}>
                        <Text style={styles.section}>Genre</Text>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 5 }}>
                            {
                                itemMovie.genre_ids.map((i) => {
                                    const genreName = genres.filter(g => g.id === i);
                                    return <GenreItem key={i} name={genreName[0].name} />
                                })
                            }
                        </View>
                    </View>
                </View>
                <View style={styles.dash}></View>

                <Text style={styles.section}>{`Cast & Crew`}</Text>

                <View style={{ justifyContent: 'space-around', flexWrap: 'wrap', flexDirection: 'row', marginLeft: 5 }}>
                    {
                        castLess.map((i) => {
                            const image_source = `${URL_IMG}/w200${i.profile_path}`;
                            return (
                                <View key={i.id} style={styles.imagesContainer}>
                                    <TouchableOpacity activeOpacity={.7} onPress={() => {
                                        onCastTouch(i.id);
                                    }}>
                                        <Image style={styles.images} resizeMode='contain' source={{ uri: image_source }} />
                                    </TouchableOpacity>
                                    <Text numberOfLines={1} style={styles.textCast}>{i.name}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                {
                    cast.length > 3 &&
                    <TouchableOpacity
                        style={{ alignItems: 'flex-end', marginTop: 10 }}
                        activeOpacity={.7} onPress={() => {
                            onListCastTouch();
                        }}>
                        <Text style={styles.showMore}>Show more</Text>
                    </TouchableOpacity>
                }

                <View style={styles.dash}></View>

                <Text style={styles.section}>Synopsis</Text>
                <Text numberOfLines={num} style={styles.textGray}>{itemMovie.overview}</Text>
                {
                    visibility ? <View></View> :
                        <View>
                            <TouchableOpacity disabled={visibility} activeOpacity={.7} onPress={() => {
                                setVisibility(true);
                                setNumLine(15);
                            }}>
                                <Text style={styles.showMore}>Read more</Text>
                            </TouchableOpacity>
                        </View>
                }

                <View style={styles.dash}></View>

                <Text style={styles.section}>Related Movies</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.mainBg,
    },
    containerDetail: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        marginTop: 10
    },
    title: {
        color: COLORS.white,
        fontSize: 24,
        lineHeight: 40,
        fontFamily: 'lato_regular'
    },
    textGray: {
        color: COLORS.gray,
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        fontFamily: 'lato_regular',
        lineHeight: 25
    },
    iconSmall: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    showMore: {
        color: COLORS.white,
        fontFamily: 'lato_regular',
        textDecorationLine: 'underline'
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
        marginBottom: 10,
        fontFamily: 'lato_regular'
    },
    containerGenresItem: {
        flexDirection: "row",
        alignSelf: "flex-start",
        backgroundColor: COLORS.gray3,
        borderRadius: 50,
        paddingLeft: 5,
        paddingRight: 5,
        margin: 5
    },
    images: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    imagesContainer: {
        margin: 5
    },
    textCast: {
        color: COLORS.gray2,
        width: 100,
        textAlign: 'center',
        marginTop: 5
    }
});

export default DescriptionVideo;