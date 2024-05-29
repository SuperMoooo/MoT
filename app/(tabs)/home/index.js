import { SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { setNotas, removeNota } from '../../notas/notasSlice';
import { setThemeGlobal } from '../../theme/themeSlice';
import LongPressBar from '../../components/global_comp/LongPressBar.js';
import HeaderNotes from '../../components/notes_comp/homePage/HeaderNotes.js';
import ScrollAllNotes from '../../components/notes_comp/homePage/ScrollAllNotes.js';
import AddNoteBtn from '../../components/notes_comp/homePage/AddNoteBtn.js';
import ModalDelete from '../../components/global_comp/ModalDelete.js';

const Notas = () => {
    const [search, setSearch] = useState('');
    const notes = useSelector((state) => state.notes);
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);
    const [longPress, setLongPress] = useState(false);
    const [longPressDelay, setLongPressDelay] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalDeleteDelay, setModaDeleteDelay] = useState(false);
    const [currentNoteDeleteId, setCurrentNoteDeleteId] = useState(null);

    //GET NOTES LOCAL STORAGE
    useEffect(() => {
        async function getNotes() {
            try {
                const notes = await AsyncStorage.getItem('notes');
                if (notes !== null) {
                    dispatch(setNotas({ notas: JSON.parse(notes) }));
                }
            } catch (error) {
                console.error(
                    'Error retrieving notes from AsyncStorage:',
                    error
                );
            }
        }

        getNotes();
    }, []);

    //GET THEME LOCAL STORAGE
    useEffect(() => {
        async function getTheme() {
            try {
                const themeAsync = await AsyncStorage.getItem('theme');
                if (themeAsync !== null) {
                    dispatch(setThemeGlobal({ theme: JSON.parse(themeAsync) }));
                } else {
                    dispatch(setThemeGlobal({ theme: 'dark' }));
                }
            } catch (error) {
                console.error('Error retrieving theme:', error);
            }
        }

        getTheme();
    }, []);

    //DELETE NOTE
    const handleTouchOutModal = useCallback(() => {
        setModalDelete(false);
        setTimeout(() => {
            setModaDeleteDelay(false);
        }, 350);
    }, []);

    const openModalDelete = (id) => {
        setModalDelete(true);
        setModaDeleteDelay(true);
        setCurrentNoteDeleteId(id);
    };

    const deleteNote = () => {
        dispatch(removeNota({ id: currentNoteDeleteId }));
        setCurrentNoteDeleteId(null);
        setModalDelete(false);
        setModaDeleteDelay(false);
    };

    //LONG PRESS FUNC
    const longPressHandlerFalse = useCallback(() => {
        setLongPress(false);
        setTimeout(() => {
            setLongPressDelay(false);
        }, 500);
    }, []);

    const longPressHandlerTrue = useCallback(() => {
        setLongPress(true);
        setLongPressDelay(true);
    }, []);

    return (
        <SafeAreaView
            style={{
                backgroundColor: theme === 'dark' ? '#000' : 'white',
                flex: 1,
            }}
        >
            <View style={{ flexDirection: 'column', flex: 1, padding: 15 }}>
                {/* HEADER - SEARCH & SETTINGS ICON */}
                <HeaderNotes
                    longPress={longPress}
                    theme={theme}
                    search={search}
                    setSearch={setSearch}
                />

                {/* ALL NOTES AVALIABLE */}
                <ScrollAllNotes
                    notes={notes}
                    search={search}
                    longPressHandlerTrue={longPressHandlerTrue}
                    theme={theme}
                    longPress={longPress}
                    openModalDelete={openModalDelete}
                />
            </View>
            {/* GO TO ADD NOTE PAGE */}
            <AddNoteBtn theme={theme} />
            {/* LONG PRESS THINGS */}
            <LongPressBar
                longPress={longPress}
                longPressDelay={longPressDelay}
                longPressHandlerFalse={longPressHandlerFalse}
                theme={theme}
            />

            <ModalDelete
                modalDelete={modalDelete}
                theme={theme}
                handleTouchOutModal={handleTouchOutModal}
                modalDeleteDelay={modalDeleteDelay}
                deleteFunc={deleteNote}
                page={'note'}
            />
        </SafeAreaView>
    );
};

export default Notas;
