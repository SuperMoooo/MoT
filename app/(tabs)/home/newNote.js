import { SafeAreaView, Alert } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { addNota } from '../../notas/notasSlice';
import { nanoid } from '@reduxjs/toolkit';
import HeaderAddNote from '../../components/notes_comp/addNotePage/HeaderAddNote';
import AddNoteMessageInput from '../../components/notes_comp/addNotePage/AddNoteMessageInput';
import InsertNoteBtn from '../../components/notes_comp/addNotePage/InsertNoteBtn';

const NovaNota = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const theme = useSelector((state) => state.theme);
    const dispacth = useDispatch();

    const addNote = () => {
        if (title !== '' && message !== '') {
            const date = new Date();
            const newNote = {
                id: title + nanoid(),
                title: title,
                message: message,
                date: date.toLocaleDateString(),
            };
            dispacth(addNota(newNote));
            router.back();
        } else {
            Alert.alert('ERROR!', 'Fill all camps!');
        }
    };

    const typeTitle = useCallback((text) => {
        setTitle(text);
    }, []);

    const typeMessage = useCallback((text) => {
        setMessage(text);
    }, []);

    return (
        <SafeAreaView
            style={{
                padding: 15,
                flex: 1,
                alignItems: 'flex-start',
                backgroundColor: theme === 'dark' ? '#000' : 'white',
                justifyContent: 'flex-start',
                position: 'relative',
            }}
        >
            {/* GO BACK AND TITLE INPUT */}
            <HeaderAddNote theme={theme} title={title} typeTitle={typeTitle} />
            {/* MESSAGE INPUT */}
            <AddNoteMessageInput
                theme={theme}
                message={message}
                typeMessage={typeMessage}
            />
            {/* INSERT NOTE */}
            <InsertNoteBtn theme={theme} addNote={addNote} />
        </SafeAreaView>
    );
};

export default NovaNota;
