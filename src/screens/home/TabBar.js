import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import COLORS from '../../colors';
import Tab from './Tab';

const TabBar = ({ data, onTabPress }) => {


    const [selectItem, setSelectItem] = useState(0);

    return (
        <View>
            <FlatList
                data={data}
                horizontal
                extraData={selectItem}
                overScrollMode='never'
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {

                    let color = COLORS.orange;

                    if (index !== selectItem) color = COLORS.white;

                    return (
                        <Tab item={item}
                            colorSelect={color}
                            onTabPress={() => {
                                setSelectItem(index);
                                onTabPress(item);
                            }} />
                    )
                }}
            />

        </View>
    );
}

export default TabBar;