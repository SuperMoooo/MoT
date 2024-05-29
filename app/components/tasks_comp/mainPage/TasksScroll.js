import { Text, FlatList, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const TasksScroll = ({
    tasks,
    theme,
    longPress,
    longPressHandlerTrue,
    search,
    openModalDelete,
}) => {
    const renderItem = ({ item }) => (
        <Link
            key={item.id}
            href={`tasks/${item.title}?tasks=${encodeURIComponent(
                JSON.stringify(item.tasks)
            )}&id=${item.id}&fieldsAux=${encodeURIComponent(
                JSON.stringify(item.fields)
            )}`}
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
                    {item.title}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                >
                    <BouncyCheckbox
                        size={20}
                        fillColor={theme === 'dark' ? '#d4b37f' : '#f7bb5c'}
                        innerIconStyle={{ borderWidth: 1 }}
                        iconImageStyle={{ borderWidth: 4 }}
                        isChecked={item.tasks[0].isDone}
                        disabled={true}
                    ></BouncyCheckbox>
                    <Text
                        style={{
                            fontSize: 18,
                            color: '#9e9e9e',
                            textAlign: 'left',
                            flex: 1,
                            verticalAlign: 'middle',
                            textDecorationLine: item.tasks[0].isDone
                                ? 'line-through'
                                : 'none',
                        }}
                        numberOfLines={1}
                    >
                        {item.tasks[0].taskName}
                    </Text>
                </View>

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
            data={tasks.filter((task) =>
                search.toLowerCase() === ''
                    ? true
                    : task.title.toLowerCase().includes(search)
            )}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
                width: '100%',
            }}
        />
    );
};

export default TasksScroll;
