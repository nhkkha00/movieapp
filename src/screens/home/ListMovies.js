
import React from 'react';
import { View, StyleSheet, FlatList, Dimensions,Animated } from 'react-native';
import Movie from './Movie';

const ListMovies = ({ data,scrollX, onTouchMovie }) => {

    const numColums = 2;

    return (
        <View style={styles.container}>
            <FlatList
                overScrollMode='never'
                numColumns={numColums}
                showsVerticalScrollIndicator={false}
                data={data}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                  )}
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
    }
});

export default ListMovies;