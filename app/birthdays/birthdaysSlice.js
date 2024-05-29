import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const birthdaysSlice = createSlice({
    name: 'birthdays',
    initialState: [],
    reducers: {
        addBirthDay: (state, action) => {
            state.push({
                id: action.payload.id,
                person: action.payload.person,
                birthDate: action.payload.birthDate,
                age: action.payload.age,
            });

            AsyncStorage.setItem('birthdays', JSON.stringify(state));
        },
        removeBirthDay: (state, action) => {
            const newState = state.filter(
                (birthDays) => birthDays.id !== action.payload.id
            );
            AsyncStorage.setItem('birthdays', JSON.stringify(newState));
            return newState;
        },
        updateBirthDay: (state, action) => {
            const newState = state.map((birthDays) => {
                if (birthDays.id === action.payload.id) {
                    return {
                        ...birthDays,
                        id: action.payload.id,
                        person: action.payload.person,
                        birthDate: action.payload.birthDate,
                        age: action.payload.age,
                    };
                }
                return birthDays;
            });
            AsyncStorage.setItem('birthdays', JSON.stringify(newState));
            return newState;
        },
        setBirthDay: (state, action) => {
            return action.payload.birthdays;
        },
    },
});

export const { addBirthDay, removeBirthDay, updateBirthDay, setBirthDay } =
    birthdaysSlice.actions;
export default birthdaysSlice.reducer;
