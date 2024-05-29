import { Alert, Platform, SafeAreaView, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderAddBirthDay from '../../components/birthday_comp/newBirthDayPage/HeaderAddBirthDay';
import CalendarAddBirthDay from '../../components/birthday_comp/newBirthDayPage/CalendarAddBirthDay';
import InsertBirthDayBtn from '../../components/birthday_comp/newBirthDayPage/InsertBirthDayBtn';
import { addBirthDay } from '../../birthdays/birthdaysSlice';
import { nanoid } from '@reduxjs/toolkit';
import { router } from 'expo-router';
import SelectDate from '../../components/birthday_comp/newBirthDayPage/SelectDate';
import * as Notifications from 'expo-notifications';
import '../birthdays/backgroundNotificationHandle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const newBirthDay = () => {
    const [person, setPerson] = useState('');
    const theme = useSelector((state) => state.theme);
    const dispacth = useDispatch();
    const [selectedBirthDay, setSelectedBirthDay] = useState('');
    const [calendarUp, setCalendarUp] = useState(false);
    const [modalCalendarDelay, setModalCalendarDelay] = useState(false);
    const [notification, setNotification] = useState(false);

    //NOTIFICATIONS
    useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);

    async function registerForPushNotificationsAsync() {
        //await Notifications.cancelAllScheduledNotificationsAsync();
        let token;
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    }

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

    const typePerson = useCallback((text) => {
        setPerson(text);
    }, []);

    const handleEnableNotification = () => {
        setNotification((prev) => !prev);
    };

    const handleChangeDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setSelectedBirthDay(formattedDate);
    };

    const hundleAddBirthDay = () => {
        if (person !== '' && selectedBirthDay !== '') {
            const dateToday = new Date();
            if (dateToday < new Date(selectedBirthDay)) {
                Alert.alert(
                    'ERROR!',
                    "You can't add a birthday in the future!"
                );
            } else {
                let currentDate = new Date();
                let birthDate = new Date(selectedBirthDay);
                let age = currentDate.getFullYear() - birthDate.getFullYear();

                if (
                    currentDate.getMonth() < birthDate.getMonth() ||
                    (currentDate.getMonth() === birthDate.getMonth() &&
                        currentDate.getDate() < birthDate.getDate())
                ) {
                    age = age - 1;
                }

                let idBirth = person + nanoid();
                const newBirthDay = {
                    id: idBirth,
                    person: person,
                    birthDate: selectedBirthDay,
                    age: age,
                };
                dispacth(addBirthDay(newBirthDay));
                //NOTIFICATIONS
                if (notification === true) {
                    Notifications.setNotificationHandler({
                        handleNotification: async () => ({
                            shouldShowAlert: true,
                            shouldPlaySound: true,
                            shouldSetBadge: true,
                        }),
                    });

                    // Call the function to schedule the notification
                    scheduleBirthdayNotification(
                        person,
                        selectedBirthDay,
                        idBirth
                    );
                }
                router.back();
            }
        } else {
            Alert.alert('ERROR!', 'Fill all camps!');
        }
    };

    const openModalCalendar = () => {
        setCalendarUp(true);
        setModalCalendarDelay(true);
    };

    const handleTouchOutModal = useCallback(() => {
        setCalendarUp(false);
        setTimeout(() => {
            setModalCalendarDelay(false);
        }, 350);
    }, []);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme === 'dark' ? '#000' : 'white',
            }}
        >
            <View style={{ flexDirection: 'column', flex: 1, padding: 15 }}>
                <HeaderAddBirthDay
                    theme={theme}
                    person={person}
                    typePerson={typePerson}
                />

                <SelectDate
                    openModalCalendar={openModalCalendar}
                    theme={theme}
                    selectedBirthDay={selectedBirthDay}
                    handleEnableNotification={handleEnableNotification}
                />

                <InsertBirthDayBtn
                    theme={theme}
                    addBirthDay={hundleAddBirthDay}
                />
            </View>
            <CalendarAddBirthDay
                theme={theme}
                handleChangeDate={handleChangeDate}
                handleTouchOutModal={handleTouchOutModal}
                modalCalendarDelay={modalCalendarDelay}
                calendarUp={calendarUp}
            />
        </SafeAreaView>
    );
};

export default newBirthDay;
