import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import Movie from './Movie';

const ListMovies = ({ data, onTouchMovie }) => {

    const { widthScreen } = Dimensions.get('screen');

    const numColums = 2;

    return (
        <View style={styles.container}>
            <FlatList
                overScrollMode='never'
                numColumns={numColums}
                data={data}
                renderItem={({ item, index }) => {
                    let width = 170;
                    let height = 200;
                    let marginTop = 10;
                    if (index % 2 !== 0) {
                        width = 170;
                        height = 170;
                        marginTop = 20;
                    }
                    return <Movie
                        item={item}
                        width={width}
                        height={height}
                        marginTop={marginTop}
                        onTouchMovie={() => {
                            onTouchMovie(item);
                        }} />
                }
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ListMovies;