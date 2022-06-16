import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import COLORS from '../../res/color/colors';
import Tab from './Tab';

import {useDeviceOrientation} from '@react-native-community/hooks'

const TabBottom = ({ state, descriptors, navigation }) => {


    return (
        <View style={styles.tabVer}>
            {
                state.routes.map((route, index) => {

                    const isFocused = state.index === index;

                    const onPress = () => {
                        navigation.navigate(route.name);
                    }

                    let iconName = ''

                    switch (route.name) {
                        case 'Home': iconName = 'home'; break;
                        case 'Fav': iconName = 'heart'; break;
                    }

                    return <Tab key={route.name} text={iconName} active={isFocused} onTouch={onPress} />

                })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabVer: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor:COLORS.mainBg,
        borderTopWidth:1,
        borderTopColor:COLORS.gray3,
        height:60
    },
});

export default TabBottom;