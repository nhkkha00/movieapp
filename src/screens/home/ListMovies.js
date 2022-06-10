
import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import Movie from './Movie';

const ListMovies = ({ data, onTouchMovie }) => {

    const numColums = 2;

    return (
        <View style={styles.container}>
            <FlatList
                overScrollMode='never'
                numColumns={numColums}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({ item, index }) => {
                    let width = 170;
                    let height = 220;
                    let marginTop = 10;
                    if (index % 2 !== 0) {
                        width = 170;
                        height = 200;
                        marginTop = 30;
                    }
                    return <Movie
                        item={item}
                        width={width}
                        height={height}
                        marginTop={marginTop}
                        onTouchMovie={() => {
                            onTouchMovie(item);
                        }} />
                }}
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