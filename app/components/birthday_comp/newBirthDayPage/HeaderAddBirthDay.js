import { View, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const HeaderAddBirthDay = ({ theme, person, typePerson }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 25,
            }}
        >
            <TouchableOpacity
                onPress={() => router.back()}
                style={{ zIndex: 100 }}
            >
                <AntDesign
                    name="back"
                    size={30}
                    color={theme === 'dark' ? 'white' : 'black'}
                />
            </TouchableOpacity>
            {/* TITLE INPUT */}
            <TextInput
                value={person}
                onChangeText={(e) => typePerson(e)}
                placeholder="Person Name"
                autoCorrect={false}
                placeholderTextColor={'gray'}
                cursorColor={theme === 'dark' ? '#d4b37f' : '#f7bb5c'}
                style={{
                    width: '100%',
                    color: theme === 'dark' ? '#fff' : '#000',
                    fontSize: 24,
                    flex: 1,
                    marginLeft: 35,
                    paddingRight: 55,
                    fontWeight: 'bold',
                }}
            ></TextInput>
        </View>
    );
};

export default HeaderAddBirthDay;
