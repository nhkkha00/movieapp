import React from 'react';
import { View, FlatList } from 'react-native';
import Tab from './Tab';

const TabBar = ({ data, onTabPress }) => {
    return (
        <View>
            <FlatList
                data={data}
                horizontal
                overScrollMode='never'
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <Tab item={item} onTabPress={() => {
                            onTabPress(item);
                        }} />
                    )
                }}
            />
        </View>
    );
}

export default TabBar;