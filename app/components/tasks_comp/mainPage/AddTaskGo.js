import { Link } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const AddTaskGo = ({ theme }) => {
    return (
        <Link href="tasks/newTask" asChild>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 50,
                    right: 30,
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
                <Entypo
                    name="add-to-list"
                    size={30}
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
        </Link>
    );
};

export default AddTaskGo;
