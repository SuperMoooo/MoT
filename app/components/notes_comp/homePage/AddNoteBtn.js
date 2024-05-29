import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const AddNoteBtn = ({ theme }) => {
    return (
        <Link href="home/newNote" asChild>
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
                <MaterialIcons
                    name="edit-note"
                    size={40}
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

export default AddNoteBtn;
