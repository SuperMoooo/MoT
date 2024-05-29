import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const SelectDate = ({
    openModalCalendar,
    theme,
    selectedBirthDay,
    handleEnableNotification,
}) => {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text
                style={{
                    color: theme === 'dark' ? '#fff' : '#000',
                    textAlign: 'center',
                    marginBottom: 20,
                    fontSize: 20,
                }}
            >
                Birthdate: {selectedBirthDay}
            </Text>
            <TouchableOpacity
                style={{
                    borderColor: theme === 'dark' ? '#d4b37f' : '#f7bb5c',
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                }}
                onPress={openModalCalendar}
            >
                <Text
                    style={{
                        color: theme === 'dark' ? '#fff' : '#000',
                        textAlign: 'center',
                        fontSize: 16,
                    }}
                >
                    Select Date
                </Text>
            </TouchableOpacity>
            <View
                style={{
                    marginTop: 20,
                    flexDirection: 'row',
                }}
            >
                <Text
                    style={{
                        color: theme === 'dark' ? '#fff' : '#000',
                        textAlign: 'center',
                        fontSize: 20,
                        marginRight: 15,
                    }}
                >
                    Notification?
                </Text>
                <BouncyCheckbox
                    size={35}
                    fillColor={theme === 'dark' ? '#d4b37f' : '#f7bb5c'}
                    innerIconStyle={{ borderWidth: 1 }}
                    iconImageStyle={{ borderWidth: 8 }}
                    onPress={handleEnableNotification}
                ></BouncyCheckbox>
            </View>
        </View>
    );
};

export default SelectDate;
