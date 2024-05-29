import { SafeAreaView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { removeBirthDay, setBirthDay } from '../../birthdays/birthdaysSlice';
import { useDispatch, useSelector } from 'react-redux';
import HeaderBirthDay from '../../components/birthday_comp/homePage/HeaderBirthDay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setThemeGlobal } from '../../theme/themeSlice';
import { View } from 'react-native-animatable';
import ScrollAllBirthdays from '../../components/birthday_comp/homePage/ScrollAllBirthdays';
import AddBirthdayBtn from '../../components/birthday_comp/homePage/AddBirthdayBtn';
import LongPressBar from '../../components/global_comp/LongPressBar';
import ModalDelete from '../../components/global_comp/ModalDelete';
import * as Notifications from 'expo-notifications';

const birthdays = () => {
    const birthDays = useSelector((state) => state.birthdays);
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);
    const [longPress, setLongPress] = useState(false);
    const [longPressDelay, setLongPressDelay] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalDeleteDelay, setModaDeleteDelay] = useState(false);
    const [currentDeleteId, setCurrentDeleteId] = useState(null);
    const [search, setSearch] = useState('');

    //GET BIRTHDAYS LOCAL STORAGE
    useEffect(() => {
        async function getNotes() {
            try {
                const birthdays = await AsyncStorage.getItem('birthdays');
                if (birthdays !== null) {
                    dispatch(setBirthDay({ birthdays: JSON.parse(birthdays) }));
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

    // DELETE BIRTHDAY

    const handleTouchOutModal = useCallback(() => {
        setModalDelete(false);
        setTimeout(() => {
            setModaDeleteDelay(false);
        }, 350);
    }, []);

    const openModalDelete = (id) => {
        setModalDelete(true);
        setModaDeleteDelay(true);
        setCurrentDeleteId(id);
    };

    const deleteBirthday = async () => {
        const notificationId = await AsyncStorage.getItem(currentDeleteId);
        if (notificationId) {
            // Cancel the notification
            await Notifications.cancelScheduledNotificationAsync(
                notificationId
            );

            // Remove the notificationId from storage
            await AsyncStorage.removeItem(currentDeleteId);
        }

        dispatch(removeBirthDay({ id: currentDeleteId }));
        setCurrentDeleteId(null);
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
                flex: 1,
                backgroundColor: theme === 'dark' ? '#000' : 'white',
            }}
        >
            <View style={{ flexDirection: 'column', flex: 1, padding: 15 }}>
                <HeaderBirthDay
                    theme={theme}
                    search={search}
                    setSearch={setSearch}
                />
                <ScrollAllBirthdays
                    birthdays={birthDays}
                    search={search}
                    longPressHandlerTrue={longPressHandlerTrue}
                    theme={theme}
                    longPress={longPress}
                    openModalDelete={openModalDelete}
                />
            </View>
            <AddBirthdayBtn theme={theme} />

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
                deleteFunc={deleteBirthday}
            />
            {/*<Calendar
                    style={{ marginTop: 150 }}
                    theme={{ calendarBackground: '#000' }}
        />*/}
        </SafeAreaView>
    );
};

export default birthdays;
