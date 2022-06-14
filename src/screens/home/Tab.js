import React, { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../../res/color/colors';

const Tab = forwardRef(({ item, onTabPress, colorSelect }, ref) => {
    return (
        <TouchableOpacity activeOpacity={.7} style={styles.container} onPress={onTabPress}>
            <View ref={ref} 
            >
                <Text style={{
                    color: colorSelect,
                    fontSize: 18,
                    fontFamily: 'lato_regular'
                }}>{item.object.name}</Text>
            </View>
        </TouchableOpacity>

    );
})

const styles = StyleSheet.create({
    container: {
        margin:10
    }
});

export default Tab;