import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTasks: (state, action) => {
            state.push({
                id: action.payload.id,
                title: action.payload.title,
                tasks: action.payload.tasks,
                date: action.payload.date,
                fields: action.payload.fields,
            });

            AsyncStorage.setItem('tasks', JSON.stringify(state));
        },
        removeTasks: (state, action) => {
            const newState = state.filter(
                (tasks) => tasks.id !== action.payload.id
            );
            AsyncStorage.setItem('tasks', JSON.stringify(newState));
            return newState;
        },
        updateTasks: (state, action) => {
            const newState = state.map((tasks) => {
                if (tasks.id === action.payload.id) {
                    return {
                        ...tasks,
                        title: action.payload.title,
                        tasks: action.payload.tasks,
                        date: action.payload.date,
                        fields: action.payload.fields,
                    };
                }
                return tasks;
            });
            AsyncStorage.setItem('tasks', JSON.stringify(newState));
            return newState;
        },
        setTasks: (state, action) => {
            return action.payload.tasks;
        },
    },
});

export const { addTasks, removeTasks, updateTasks, setTasks } =
    tasksSlice.actions;
export default tasksSlice.reducer;
