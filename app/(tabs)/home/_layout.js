import React from 'react';
import { Stack } from 'expo-router';

const StackLayoutNotes = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="newNote"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="[title]"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="settings"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
};

export default StackLayoutNotes;
