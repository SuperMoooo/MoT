import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const BirthDayInfoMain = ({ theme, birthdayInput, age, openModalCalendar }) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    color: theme === 'dark' ? '#fff' : '#000',
                    textAlign: 'center',
                    fontSize: 20,
                    margin: 10,
                }}
            >
                Birthdate: {birthdayInput}
            </Text>
            <Text
                style={{
                    color: theme === 'dark' ? '#fff' : '#000',
                    textAlign: 'center',
                    fontSize: 20,
                    margin: 10,
                }}
            >
                Age: {age}
            </Text>
            <TouchableOpacity
                style={{
                    borderColor: theme === 'dark' ? '#d4b37f' : '#f7bb5c',
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                    margin: 10,
                }}
                onPress={openModalCalendar}
            >
                <Text
                    style={{
                        color: theme === 'dark' ? '#fff' : '#000',
                        textAlign: 'center',
                        fontSize: 16,
                    }}
                >
                    Select Date
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default BirthDayInfoMain;
