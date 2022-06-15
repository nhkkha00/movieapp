
import React from 'react';
import { View, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native';
import Movie from './Movie';

const ListMovies = ({ data, scrollX, onTouchMovie }) => {

    const numColums = 2;

    return (
        <View style={styles.container}>
            <ScrollView
                scrollEnabled
            >
                {
                    data.map((item) => {
                        let width = 170;
                        let height = 220;
                        let marginTop = 10;
                        return <Movie
                            key={item.id}
                            item={item}
                            width={width}
                            height={height}
                            marginTop={marginTop}
                            onTouchMovie={() => {
                                onTouchMovie(item);
                            }} />
                    })
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ListMovies;