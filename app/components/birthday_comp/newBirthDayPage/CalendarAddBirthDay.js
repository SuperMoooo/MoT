import { Pressable } from 'react-native';
import React from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import * as Animatable from 'react-native-animatable';

const CalendarAddBirthDay = ({
    theme,
    handleChangeDate,
    handleTouchOutModal,
    modalCalendarDelay,
    calendarUp,
    dateChosen,
}) => {
    return (
        <Pressable
            style={{
                display: modalCalendarDelay ? 'flex' : 'none',
                flex: 1,
                width: '100%',
                height: '100%',
                alignSelf: 'center',
                justifyContent: 'flex-end',
                alignItems: 'center',
                zIndex: 9999,
                position: 'absolute',
                backgroundColor:
                    theme === 'dark'
                        ? 'rgba(43, 43, 43,0.5)'
                        : 'rgba(232, 232, 232,0.5)',
                top: 0,
                left: 0,
            }}
            onPress={handleTouchOutModal}
        >
            <Animatable.View
                animation={calendarUp ? 'fadeInUp' : 'fadeOutDown'}
                duration={200}
                style={{
                    backgroundColor: theme === 'dark' ? '#323232' : 'white',
                    borderColor: theme !== 'dark' && '#e0e0e0',
                    borderWidth: theme === 'dark' ? 0 : 1,
                    width: '100%',
                    height: '50%',
                    zIndex: 99999,
                    position: 'relative',
                    bottom: -3,
                    left: 0,
                    display: 'flex',
                    padding: 15,
                    borderTopStartRadius: 30,
                    borderTopEndRadius: 30,
                    shadowColor: theme !== 'dark' && '#000',
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },
                    shadowOpacity: 0.46,
                    shadowRadius: 11.14,

                    elevation: 17,
                }}
            >
                <CalendarPicker
                    onDateChange={(date) => {
                        handleChangeDate(date);
                    }}
                    selectedDayColor={theme === 'dark' ? '#d4b37f' : '#f7bb5c'}
                    textStyle={{
                        color: theme === 'dark' ? 'white' : '#000',
                    }}
                    initialDate={dateChosen ? dateChosen : new Date()}
                />
            </Animatable.View>
        </Pressable>
    );
};

export default CalendarAddBirthDay;
