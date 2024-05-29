import { View } from 'react-native';
import React, { memo } from 'react';
import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';

const index = () => {
    const theme = useSelector((state) => state.theme);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme === 'dark' ? '#2b2a2a' : 'white',
            }}
        >
            <Redirect href={'/(tabs)/home'} />
        </View>
    );
};

export default memo(index);
