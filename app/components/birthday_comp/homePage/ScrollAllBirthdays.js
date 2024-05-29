import { Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const ScrollAllBirthdays = ({
    birthdays,
    search,
    longPressHandlerTrue,
    theme,
    longPress,
    openModalDelete,
}) => {
    const calculateAge = (birthDate) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
        ) {
            age -= 1;
        }
        return age;
    };

    const renderItem = ({ item }) => {
        const age = calculateAge(item.birthDate);

        return (
            <Link
                key={item.id}
                href={`birthdays/${item.person}?birthday=${item.birthDate}&id=${item.id}&age=${age}`}
                asChild
            >
                <TouchableOpacity
                    onLongPress={longPressHandlerTrue}
                    style={{
                        position: 'relative',
                        backgroundColor: theme === 'dark' ? '#212121' : 'white',
                        width: '100%',
                        height: 115,
                        borderRadius: 8,
                        padding: 10,
                        flex: 1,
                        marginBottom: 10,
                        alignItems: 'self-start',
                        justifyContent: 'space-between',
                        borderColor: theme !== 'dark' && '#e0e0e0',
                        borderWidth: theme === 'dark' ? 0 : 1,
                        shadowColor: theme !== 'dark' && '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: theme !== 'dark' && 0.25,
                        shadowRadius: theme !== 'dark' && 3.84,
                        elevation: 5,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            color: theme === 'dark' ? 'white' : 'black',
                            textAlign: 'left',
                            width: '100%',
                        }}
                    >
                        {item.person}
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            color: '#9e9e9e',
                            textAlign: 'left',
                            width: '100%',
                        }}
                        numberOfLines={1}
                    >
                        {age + ' years old'}
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            color: theme === 'dark' ? '#949494' : '#878787',
                            textAlign: 'left',
                            width: '100%',
                        }}
                        numberOfLines={1}
                    >
                        {'Birthdate: ' + item.birthDate}
                    </Text>

                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            display: longPress ? 'flex' : 'none',
                            right: 30,
                            top: 35,
                            opacity: 0.7,
                        }}
                        onPress={() => openModalDelete(item.id)}
                    >
                        <Animatable.View
                            animation={longPress ? 'fadeIn' : 'fadeOut'}
                            easing="ease-in-out"
                        >
                            <AntDesign
                                name="delete"
                                size={30}
                                color={theme === 'dark' ? '#c2716d' : '#f74639'}
                            />
                        </Animatable.View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Link>
        );
    };

    return (
        <FlatList
            data={birthdays.filter((birthday) =>
                search.toLowerCase() === ''
                    ? true
                    : birthday.person.toLowerCase().includes(search)
            )}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
                width: '100%',
            }}
        />
    );
};

export default ScrollAllBirthdays;
