import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import COLORS from '../../colors';
import Tab from './Tab';

const TabBottom = ({ state, descriptors, navigation }) => {

    return (
        <View style={styles.tab}>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tab: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: COLORS.mainBg
    }
});

export default TabBottom;