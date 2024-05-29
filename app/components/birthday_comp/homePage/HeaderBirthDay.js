import { View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const HeaderBirthDay = ({ theme, search, setSearch }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 35,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: 5,
                    marginBottom: 25,
                }}
            >
                <AntDesign
                    name="search1"
                    size={24}
                    color="gray"
                    style={{ verticalAlign: 'middle' }}
                />
                <TextInput
                    style={{
                        marginLeft: 15,
                        fontSize: 20,
                        verticalAlign: 'middle',
                        padding: 2,
                        paddingRight: 10,
                        color: 'white',
                    }}
                    cursorColor={theme === 'dark' ? '#d4b37f' : '#f7bb5c'}
                    autoFocus={false}
                    value={search}
                    onChangeText={(e) => setSearch(e.toLowerCase())}
                    placeholder="Search..."
                    placeholderTextColor={'gray'}
                    maxLength={20}
                    autoCapitalize="none"
                />
            </View>
            {/* SETTINGS ICON */}
            <Link href="home/settings" asChild>
                <TouchableOpacity style={{ marginBottom: 25 }}>
                    <AntDesign
                        name="setting"
                        size={35}
                        color={theme === 'dark' ? 'white' : 'black'}
                        style={{ verticalAlign: 'middle' }}
                    />
                </TouchableOpacity>
            </Link>
        </View>
    );
};

export default HeaderBirthDay;
