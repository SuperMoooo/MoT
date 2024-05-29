import React from 'react';
import { Stack } from 'expo-router';

const StackLayoutBirthdays = () => {
    return (
        <Stack>
            <Stack.Screen
                name="birthdayHome"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="newBirthDay"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="[birthPerson]"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
};

export default StackLayoutBirthdays;
