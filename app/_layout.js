import { Stack } from 'expo-router';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import notesReducer from './notas/notasSlice';
import themeReducer from './theme/themeSlice';
import tasksReducer from './tasks/tasksSlice';
import birthdaysReducer from './birthdays/birthdaysSlice';

const store = configureStore({
    reducer: {
        notes: notesReducer,
        theme: themeReducer,
        tasks: tasksReducer,
        birthdays: birthdaysReducer,
    },
});

const StackLayout = () => {
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </Provider>
    );
};
store.subscribe(() => {
    console.log(store.getState());
});
export default StackLayout;
