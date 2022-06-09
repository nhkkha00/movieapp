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

                    let textColor = COLORS.orange;

                    if (index !== selectItem) {
                        textColor = COLORS.white;
                    }

                    return (
                        <View>
                            <Tab item={item}
                                colorSelect={textColor}
                                onTabPress={() => {
                                    setSelectItem(index);
                                    onTabPress(item);
                                }} />
                        </View>
                    )
                }}
            />
        </View>
    );
}

export default TabBar;