import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: [],
    reducers: {
        addTheme: (state, action) => {
            state.push({
                theme: action.payload.theme,
            });

            AsyncStorage.setItem('theme', JSON.stringify(state));
        },
        updateTheme: (state, action) => {
            AsyncStorage.setItem('theme', JSON.stringify(action.payload.theme));

            return (state.theme = action.payload.theme);
        },
        setThemeGlobal: (state, action) => {
            return action.payload.theme;
        },
    },
});

export const { addTheme, updateTheme, setThemeGlobal } = themeSlice.actions;
export default themeSlice.reducer;
