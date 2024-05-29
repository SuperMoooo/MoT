import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const notasSlice = createSlice({
    name: 'notas',
    initialState: [],
    reducers: {
        addNota: (state, action) => {
            state.push({
                id: action.payload.id,
                title: action.payload.title,
                message: action.payload.message,
                date: action.payload.date,
            });

            AsyncStorage.setItem('notes', JSON.stringify(state));
        },
        removeNota: (state, action) => {
            const newState = state.filter(
                (nota) => nota.id !== action.payload.id
            );
            AsyncStorage.setItem('notes', JSON.stringify(newState));
            return newState;
        },
        updateNota: (state, action) => {
            const newState = state.map((nota) => {
                if (nota.id === action.payload.id) {
                    return {
                        ...nota,
                        title: action.payload.title,
                        message: action.payload.message,
                        date: action.payload.date,
                    };
                }
                return nota;
            });
            AsyncStorage.setItem('notes', JSON.stringify(newState));
            return newState;
        },
        setNotas: (state, action) => {
            return action.payload.notas;
        },
    },
});

export const { addNota, removeNota, updateNota, setNotas } = notasSlice.actions;
export default notasSlice.reducer;
