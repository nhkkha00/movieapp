import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import COLORS from '../res/color/colors';






const Pagination = ({ pageCurrent, pageLength ,onChangePage, onNext, onPrev }) => {

    const numbersOfPage = [];

    for (let i = 1; i <= pageLength; i++) {
        numbersOfPage.push(i);
    }


    const [arrCurrent, setArrCurrent] = useState([]);

    useEffect(() => {
        let tempNumberOfPage = [...numbersOfPage];

        if (pageCurrent >= 1 && pageCurrent <= 3) {
            tempNumberOfPage = [1, 2, 3, 4, '...', numbersOfPage.length];
        }
        else if (pageCurrent === 4) {
            const sliced = numbersOfPage.slice(0, 5);
            tempNumberOfPage = [...sliced, '...', numbersOfPage.length];
        } else if (pageCurrent > 4 && pageCurrent < numbersOfPage.length - 2) { //from 5->8 (10-2)
            const sliced1 =
                numbersOfPage.slice(pageCurrent - 2, pageCurrent); //slide1 (5-2,5) -> [4,5]
            const sliced2 =
                numbersOfPage.slice(pageCurrent, pageCurrent + 1); //slide1 (5,5+1) -> [6]

            tempNumberOfPage =
                ([1, '...', ...sliced1, ...sliced2, '...', numbersOfPage.length]); // [1,...,4,5,6...,10]
        } else if (pageCurrent > numbersOfPage.length - 3) { // > 7
            const sliced = numbersOfPage.slice(numbersOfPage.length - 4); //slide (10-4)
            tempNumberOfPage = ([1, '...', ...sliced]);
        }


        setArrCurrent(tempNumberOfPage);
    }, [pageCurrent])

    return (
        <View style={styles.container}>
            {pageCurrent === 1 ? <View style={styles.pageHidden}></View> :
                <TouchableOpacity activeOpacity={.7} onPress={() => {
                    onPrev();
                }}>
                    <View style={[styles.page, { width: 40, margin: 7, textDecorationLine: 'underline', borderWidth: 1 }]}>
                        <Text
                            style={{ color: COLORS.white }}>
                            Prev
                        </Text>
                    </View>
                </TouchableOpacity>
            }
            {arrCurrent.map((page, index) => {
                const underline = page === pageCurrent ? { textDecorationLine: 'underline' } : { textDecorationLine: 'none' };
                const color = page === pageCurrent ? { color: COLORS.pink } : { color: COLORS.white }

                if (page === '...') {
                    return (
                        <View key={index} style={[styles.page, { margin: 7 }]}>
                            <Text
                                style={[underline, color]}>
                                {page}
                            </Text>
                        </View>
                    );
                } else {
                    return (
                        <TouchableOpacity key={index} activeOpacity={.7} onPress={() => {
                            onChangePage(page);
                        }}>
                            <View style={[styles.page, { margin: 7 }]}>
                                <Text
                                    style={[underline, color]}>
                                    {page}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }
            })}
            {pageCurrent === pageLength ? <View style={styles.pageHidden}></View> :
                <TouchableOpacity activeOpacity={.7} onPress={() => {
                    onNext();
                }}>
                    <View style={[styles.page, { width: 40, margin: 7, textDecorationLine: 'underline', borderWidth: 1 }]}>
                        <Text
                            style={{ color: COLORS.white }}>
                            Next
                        </Text>
                    </View>
                </TouchableOpacity>
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center'
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.gray3,
    },
    pageHidden: {
        marginLeft: 10,
        marginRight: 10,
        width: 40
    }
});

export default Pagination;