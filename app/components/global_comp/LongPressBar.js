import { TouchableOpacity } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons';

const LongPressBar = ({
    longPress,
    longPressDelay,
    longPressHandlerFalse,
    theme,
}) => {
    return (
        <Animatable.View
            animation={longPress ? 'fadeInUp' : 'fadeOutDown'}
            style={{
                backgroundColor: theme === 'dark' ? '#292929' : 'white',
                borderWidth: theme === 'dark' ? 0 : 1,
                borderColor: theme !== 'dark' && '#e0e0e0',
                width: '100%',
                height: '6.5%',
                position: 'absolute',
                bottom: -5,
                left: 1,
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <TouchableOpacity
                style={{
                    display: longPressDelay ? 'flex' : 'none',
                }}
                onPress={longPressHandlerFalse}
            >
                <AntDesign
                    name="close"
                    size={35}
                    color={theme === 'dark' ? 'white' : 'black'}
                />
            </TouchableOpacity>
        </Animatable.View>
    );
};

export default LongPressBar;
