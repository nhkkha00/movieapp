import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../res/color/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { convertDateToString } from '../../utilities/convertDate';




const GenreItem = ({ name }) => {

    return (
        <View style={styles.containerGenresItem}>
            <Text style={{ color: COLORS.white, margin: 10, fontFamily:'lato_regular' }}>{name}</Text>
        </View>
    );
}


const Description = ({ item,runtime, genres }) => {

    return (
        <View style={styles.container}>
            <View style={styles.containerDetail} >
                <Text style={styles.title}>{item.title}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.iconSmall}>
                        <Ionicons name='time-outline' color={COLORS.gray} size={20} />
                    </View>
                    <Text style={styles.textGray}>{runtime} mins</Text>
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

                <View>
                    <Text numberOfLines={3} style={styles.textGray}>{item.overview}</Text>
                    <TouchableOpacity activeOpacity={.7}>
                        <Text style={{ color: COLORS.white, fontFamily:'lato_regular' }}>Read more</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.dash}></View>

                <Text style={styles.section}>Related Movies</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.mainBg
    },
    containerDetail: {
        margin: 10
    },
    title: {
        color: COLORS.white,
        fontSize: 24,
        lineHeight: 40,
        fontFamily:'lato_regular'
    },
    textGray: {
        color: COLORS.gray,
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        fontFamily:'lato_regular'
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
        marginBottom: 10,
        fontFamily:'lato_regular'
    },
    containerGenresItem: {
        flexDirection: "row",
        alignSelf: "flex-start",
        backgroundColor: COLORS.gray3,
        borderRadius: 50,
        paddingLeft: 5,
        paddingRight: 5,
        margin: 5
    }
});

export default Description;