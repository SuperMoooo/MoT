import { Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const ScrollAllNotes = ({
    notes,
    search,
    longPressHandlerTrue,
    theme,
    longPress,
    openModalDelete,
}) => {
    const renderItem = ({ item }) => (
        <Link
            key={item.id}
            href={`home/${item.title}?message=${item.message}&id=${item.id}`}
            asChild
        >
            <TouchableOpacity
                key={item.title}
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
                    {item.title}
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
                    {item.message}
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
                    {item.date}
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

    return (
        <FlatList
            data={notes.filter((note) =>
                search.toLowerCase() === ''
                    ? true
                    : note.title.toLowerCase().includes(search)
            )}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
                width: '100%',
            }}
        />
    );
};

export default ScrollAllNotes;
