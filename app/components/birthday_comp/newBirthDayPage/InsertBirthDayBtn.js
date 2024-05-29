import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

const InsertBirthDayBtn = ({ addBirthDay, theme }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <TouchableOpacity
                onPress={addBirthDay}
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 10,
                    borderWidth: 1,
                    borderColor: theme === 'dark' ? '#d4b37f' : '#f7bb5c',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 73,
                    height: 73,
                    transform: [
                        {
                            rotate: '45deg',
                        },
                    ],
                }}
            >
                <AntDesign
                    name="check"
                    size={35}
                    color={theme === 'dark' ? '#d4b37f' : '#f7bb5c'}
                    style={{
                        transform: [
                            {
                                rotate: '-45deg',
                            },
                        ],
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default InsertBirthDayBtn;
