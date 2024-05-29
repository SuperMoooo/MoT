import { SafeAreaView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { updateNota, removeNota } from '../../notas/notasSlice';
import { useDispatch, useSelector } from 'react-redux';
import NoteInfoHeader from '../../components/notes_comp/noteInfoPage/NoteInfoHeader';
import NoteInfoMessage from '../../components/notes_comp/noteInfoPage/NoteInfoMessage';
import BtnSaveNote from '../../components/notes_comp/noteInfoPage/BtnSaveNote';
import ModalDelete from '../../components/global_comp/ModalDelete';
import { View } from 'react-native-animatable';

const Detalhes = () => {
    const { id, title, message } = useLocalSearchParams();
    const dispatch = useDispatch();
    const [messageInput, setMessageInput] = useState(message);
    const [titleInput, setTitleInput] = useState(title);
    const theme = useSelector((state) => state.theme);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalDeleteDelay, setModaDeleteDelay] = useState(false);

    //DELETE NOTE

    const handleTouchOutModal = useCallback(() => {
        setModalDelete(false);
        setTimeout(() => {
            setModaDeleteDelay(false);
        }, 600);
    }, []);
    const openModalDelete = useCallback(() => {
        setModalDelete(true);
        setModaDeleteDelay(true);
    }, []);

    const deleteNote = () => {
        dispatch(removeNota({ id: id }));
        setModalDelete(false);
        setModaDeleteDelay(false);
        router.back();
    };

    /* UPDATE NOTE */

    const updateNote = () => {
        const date = new Date();
        dispatch(
            updateNota({
                id: id,
                title: titleInput,
                message: messageInput,
                date: `Updated: ${date.toLocaleDateString()}`,
            })
        );

        router.back();
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme === 'dark' ? '#000' : 'white',
            }}
        >
            <View style={{ flexDirection: 'column', flex: 1, padding: 15 }}>
                {/* HEADER CONTAINER */}
                <NoteInfoHeader
                    theme={theme}
                    titleInput={titleInput}
                    setTitleInput={setTitleInput}
                    openModalDelete={openModalDelete}
                />

                {/* NOTE */}
                <NoteInfoMessage
                    theme={theme}
                    messageInput={messageInput}
                    setMessageInput={setMessageInput}
                />

                {/* BTN´S SAVE*/}
                <BtnSaveNote theme={theme} updateNote={updateNote} />
            </View>
            {/* MODAL DELETE */}
            <ModalDelete
                modalDelete={modalDelete}
                theme={theme}
                handleTouchOutModal={handleTouchOutModal}
                modalDeleteDelay={modalDeleteDelay}
                deleteNote={deleteNote}
                page={'note'}
            />
        </SafeAreaView>
    );
};

export default Detalhes;
