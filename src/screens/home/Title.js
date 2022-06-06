import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import COLORS from '../../colors';


const Title = () => {

    return (
        <View>
            <Text style={{
                color: COLORS.white,
                fontSize: 24,
                marginTop: 16,
                marginLeft: 16,
                marginRight:'20%'
            }}>Find Movies, Tv series, and more..</Text>
        </View>
    );
}

export default Title;