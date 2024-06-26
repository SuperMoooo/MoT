import { View, SafeAreaView, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import BirthDayInfoHeader from '../../components/birthday_comp/birthdayInfo.js/BirthDayInfoHeader';
import BtnSaveBirthDay from '../../components/birthday_comp/birthdayInfo.js/BtnSaveBirthDay';
import { useDispatch, useSelector } from 'react-redux';
import { router, useLocalSearchParams } from 'expo-router';
import { removeBirthDay, updateBirthDay } from '../../birthdays/birthdaysSlice';
import ModalDelete from '../../components/global_comp/ModalDelete';
import BirthDayInfoMain from '../../components/birthday_comp/birthdayInfo.js/BirthDayInfoMain';
import CalendarAddBirthDay from '../../components/birthday_comp/newBirthDayPage/CalendarAddBirthDay';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../birthdays/backgroundNotificationHandle';

const BirthDayPerson = () => {
    const { id, birthPerson, birthday, age } = useLocalSearchParams();
    const dispatch = useDispatch();
    const [birthdayInput, setbirthdayInput] = useState(birthday);
    const [person, setPerson] = useState(birthPerson);
    const [ageInput, setAgeInput] = useState(age);
    const theme = useSelector((state) => state.theme);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalDeleteDelay, setModaDeleteDelay] = useState(false);
    const [calendarUp, setCalendarUp] = useState(false);
    const [modalCalendarDelay, setModalCalendarDelay] = useState(false);

    const scheduleBirthdayNotification = async (
        person,
        selectedBirthDay,
        idBirth
    ) => {
        const { nextBirthday, age } =
            calculateNextBirthdayAndAge(selectedBirthDay);

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'MoT',
                body: `It's ${person}'s birthday! Age: ${age} years old`,
                data: { person, selectedBirthDay }, // Pass data to the notification
            },
            trigger: {
                date: nextBirthday,
                repeats: false,
            },
        });
        await AsyncStorage.setItem(idBirth, notificationId);
    };

    const calculateNextBirthdayAndAge = (birthday) => {
        const today = new Date();
        const birthDate = new Date(birthday);
        const nextBirthday = new Date(
            today.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );

        // If next birthday is already passed this year, set it to next year
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }

        const age = nextBirthday.getFullYear() - birthDate.getFullYear();
        return { nextBirthday, age };
    };

    const handleChangeDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setbirthdayInput(formattedDate);

        const birthYear = new Date(formattedDate).getFullYear();
        const currentYear = new Date().getFullYear();
        const ageAux = currentYear - birthYear;

        setAgeInput(ageAux);
    };

    //DELETE BirthDay

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

    const deleteBirthDay = () => {
        dispatch(removeBirthDay({ id: id }));
        setModalDelete(false);
        setModaDeleteDelay(false);
        router.back();
    };

    /* UPDATE BirthDay */

    const handleLeaveInfo = async () => {
        router.back();
        if (birthdayInput === birthday) {
            const notificationId = await AsyncStorage.getItem(id);
            if (notificationId) {
                // Cancel the notification
                await Notifications.cancelScheduledNotificationAsync(
                    notificationId
                );

                // Remove the notificationId from storage
                await AsyncStorage.removeItem(id);
            }

            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true,
                }),
            });

            // Call the function to schedule the notification
            scheduleBirthdayNotification(person, birthdayInput, id);
            dispatch(
                updateBirthDay({
                    id: id,
                    person: person,
                    birthDate: birthdayInput,
                    age: ageInput,
                })
            );
        }
    };

    const handleUpdateBirthDay = async () => {
        dispatch(
            updateBirthDay({
                id: id,
                person: person,
                birthDate: birthdayInput,
                age: ageInput,
            })
        );

        router.back();
        const notificationId = await AsyncStorage.getItem(id);
        if (notificationId) {
            // Cancel the notification
            await Notifications.cancelScheduledNotificationAsync(
                notificationId
            );

            // Remove the notificationId from storage
            await AsyncStorage.removeItem(id);
        }

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });

        // Call the function to schedule the notification
        scheduleBirthdayNotification(person, birthdayInput, id);
    };

    const openModalCalendar = () => {
        setCalendarUp(true);
        setModalCalendarDelay(true);
    };

    const handleTouchOutModalCalendar = useCallback(() => {
        setCalendarUp(false);
        setTimeout(() => {
            setModalCalendarDelay(false);
        }, 350);
    }, []);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme === 'dark' ? '#000' : '#fff',
            }}
        >
            <View style={{ flexDirection: 'column', flex: 1, padding: 15 }}>
                {/* HEADER CONTAINER */}
                <BirthDayInfoHeader
                    theme={theme}
                    birthPerson={person}
                    setBirthPerson={setPerson}
                    openModalDelete={openModalDelete}
                    handleLeaveInfo={handleLeaveInfo}
                />

                {/* BIRTHDAY INFO */}
                <BirthDayInfoMain
                    theme={theme}
                    birthdayInput={birthdayInput}
                    age={ageInput}
                    openModalCalendar={openModalCalendar}
                />

                {/* BTN´S SAVE*/}
                <BtnSaveBirthDay
                    theme={theme}
                    handleUpdateBirthDay={handleUpdateBirthDay}
                />
            </View>
            {/* MODAL DELETE */}
            <ModalDelete
                modalDelete={modalDelete}
                theme={theme}
                handleTouchOutModal={handleTouchOutModal}
                modalDeleteDelay={modalDeleteDelay}
                deleteFunc={deleteBirthDay}
                page={'birthday'}
            />
            {/* MODAL CALENDAR */}
            <CalendarAddBirthDay
                theme={theme}
                handleChangeDate={handleChangeDate}
                handleTouchOutModal={handleTouchOutModalCalendar}
                modalCalendarDelay={modalCalendarDelay}
                calendarUp={calendarUp}
                dateChosen={birthdayInput}
            />
        </SafeAreaView>
    );
};

export default BirthDayPerson;
