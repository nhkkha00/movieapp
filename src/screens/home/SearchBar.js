import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import COLORS from '../../colors';
import AntDesign from 'react-native-vector-icons/AntDesign'

const SearchBar = () => {

    return (
        <View style={styles.container}>
            <View style={styles.borderInput}>
                <AntDesign
                    style={styles.icon}
                    name={'search1'} color={COLORS.white} size={20} />
                <TextInput
                    style={styles.inputText}
                    placeholderTextColor={COLORS.gray}
                    placeholder='Sherlock Holmes' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    icon:{
        marginLeft: 10,
        marginRight: 10
    },
    borderInput:{
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: COLORS.black,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputText:{
        color:COLORS.gray,
    }
});

export default SearchBar;