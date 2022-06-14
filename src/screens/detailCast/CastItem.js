import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { URL_IMG } from '../../connection/MethodApi';
import COLORS from '../../res/color/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const CastItem = ({ itemMovie, actorMovie, onViewMoreTouch }) => {

    const image_source = `${URL_IMG}/w200${actorMovie.profile_path}`;

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                {
                    actorMovie.profile_path === null ?
                        <View style={[styles.images, { justifyContent: 'center', alignItems: 'center' }]}>
                            <FontAwesome name='user' size={200} />
                        </View>
                        :
                        <Image style={styles.images} resizeMode='cover' source={{ uri: image_source }} />
                }
                <Text numberOfLines={2}
                    style={[styles.textName, { alignSelf: 'center', width: 150, fontSize: 17 }]}>
                    {actorMovie.name}
                </Text>
            </View>
            <TouchableOpacity activeOpacity={.7} onPress={onViewMoreTouch}>
                <Text 
                style={[styles.textName, { alignSelf: 'flex-end', textDecorationLine: 'underline' }]}>
                View Detail
                </Text>
            </TouchableOpacity>
            <View style={styles.dash}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    textName: {
        color: COLORS.white,
        fontFamily: 'lato_regular',
    },
    images: {
        width: 200,
        height: 200,
        borderRadius: 10,
        margin: 10,
        alignSelf: 'center'
    },
    dash: {
        height: 1,
        backgroundColor: COLORS.gray3,
        marginTop: 20,
        marginBottom: 20
    },
});

export default CastItem;