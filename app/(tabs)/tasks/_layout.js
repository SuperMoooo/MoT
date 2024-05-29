import React from 'react';
import { Stack } from 'expo-router';

const StackLayoutTasks = () => {
    return (
        <Stack>
            <Stack.Screen
                name="tarefas"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="newTask"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="[taskTitle]"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
};

export default StackLayoutTasks;
