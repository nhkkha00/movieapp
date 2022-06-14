import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, Animated, ScrollView, findNodeHandle } from 'react-native';
import COLORS from '../../res/color/colors';
import Tab from './Tab';

const TabBar = ({ data, width, scrollX, onTabPress }) => {

    const [selectItem, setSelectItem] = useState(0);

    const containerRef = useRef();

    return (
        <View>
            <Animated.FlatList
                data={data}
                horizontal
                overScrollMode='never'
                ref={containerRef}
                showsHorizontalScrollIndicator={false}
                CellRendererComponent={({ item, index }) => {
                    let textColor = COLORS.pink;

                    if (index !== selectItem) {
                        textColor = COLORS.white;
                    }

                    return (
                        <View
                            style={{ margin: 5 }}
                            onLayout={(event) => {
                                let { x, y, width, height } = event.nativeEvent.layout;
                                item.layout = {
                                    x: x,
                                    i: y,
                                    width: width,
                                    height: height,
                                }
                            }}>
                            <Tab
                                key={item.key}
                                item={item}
                                ref={item.ref}
                                colorSelect={textColor}
                                onTabPress={() => {
                                    setSelectItem(index);
                                    onTabPress(item, index, containerRef);
                                }} />

                        </View>
                    );
                }}
            />
        </View >
    );
}



export default TabBar;