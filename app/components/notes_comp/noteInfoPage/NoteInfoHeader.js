import { View, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const NoteInfoHeader = ({
    theme,
    titleInput,
    setTitleInput,
    openModalDelete,
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 25,
                width: '100%',
                marginBottom: 15,
                position: 'relative',
            }}
        >
            {/* GO BACK */}
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
                value={titleInput}
                onChangeText={(e) => setTitleInput(e)}
                placeholder="Title"
                autoCorrect={false}
                placeholderTextColor={'gray'}
                selectionColor={theme === 'dark' ? '#d4b37f' : '#f7bb5c'}
                cursorColor={theme === 'dark' ? '#d4b37f' : '#f7bb5c'}
                style={{
                    width: '100%',
                    height: 50,
                    color: theme === 'dark' ? '#fff' : '#000',
                    fontSize: 21,
                    flex: 1,
                    marginLeft: 35,
                    paddingRight: 55,
                    fontWeight: 'bold',
                }}
            ></TextInput>

            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    alignContent: 'center',
                    position: 'absolute',
                    right: 5,
                }}
                onPress={openModalDelete}
            >
                <AntDesign
                    name="delete"
                    size={35}
                    color={theme === 'dark' ? '#c2716d' : '#f74639'}
                />
            </TouchableOpacity>
        </View>
    );
};

export default NoteInfoHeader;
