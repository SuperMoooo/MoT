import React from 'react';
import { Tabs } from 'expo-router';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const TabsLayout = () => {
    const theme = useSelector((state) => state.theme);
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    title: 'Notes',
                    tabBarStyle: {
                        backgroundColor: theme === 'dark' ? '#000' : '#fff',
                        borderTopWidth: 1,
                        borderColor: theme === 'dark' ? '#1a1a1a' : '#e0e0e0',
                        paddingTop: 5,
                    },
                    tabBarLabelStyle: { padding: 2 },
                    tabBarActiveTintColor:
                        theme === 'dark' ? '#d4b37f' : '#f7bb5c',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="notes" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="tasks"
                options={{
                    headerShown: false,
                    title: 'Tasks',
                    tabBarStyle: {
                        backgroundColor: theme === 'dark' ? '#000' : '#fff',
                        borderTopWidth: 1,
                        borderColor: theme === 'dark' ? '#1a1a1a' : '#e0e0e0',
                        paddingTop: 5,
                    },
                    tabBarLabelStyle: { padding: 2 },
                    tabBarActiveTintColor:
                        theme === 'dark' ? '#d4b37f' : '#f7bb5c',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="tasks" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="birthdays"
                options={{
                    headerShown: false,
                    title: 'Birthdays',
                    tabBarStyle: {
                        backgroundColor: theme === 'dark' ? '#000' : '#fff',
                        borderTopWidth: 1,
                        borderColor: theme === 'dark' ? '#1a1a1a' : '#e0e0e0',
                        paddingTop: 5,
                    },
                    tabBarLabelStyle: { padding: 2 },
                    tabBarActiveTintColor:
                        theme === 'dark' ? '#d4b37f' : '#f7bb5c',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="cake" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
