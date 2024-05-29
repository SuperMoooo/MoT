import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch } from 'react-redux';
import { updateTheme } from '../../theme/themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const Settings = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [items, setItems] = useState([
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
    ]);

    const dispatch = useDispatch();
    const [theme, setTheme] = useState('dark');

    //handdle Changing theme
    const handleChangeTheme = () => {
        const newTheme = value;
        dispatch(updateTheme({ theme: newTheme }));
        setTheme(newTheme);
    };
    //get theme
    useEffect(() => {
        async function getTheme() {
            try {
                const themeAsync = await AsyncStorage.getItem('theme');
                if (themeAsync !== null) {
                    setValue(JSON.parse(themeAsync));
                }
            } catch (error) {
                console.error(
                    'Error retrieving theme from AsyncStorage:',
                    error
                );
            }
        }
        getTheme();
    }, []);

    return (
        <SafeAreaView
            style={{
                paddingHorizontal: 15,
                backgroundColor: theme === 'dark' ? '#000' : '#fff',
                flex: 1,
            }}
        >
            {/* HEADER CONTAINER */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginTop: 25,
                    width: '100%',
                    marginBottom: 45,
                }}
            >
                {/* GO BACK */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{ zIndex: 100 }}
                >
                    <AntDesign
                        name="back"
                        size={30}
                        color={theme === 'dark' ? 'white' : 'black'}
                    />
                </TouchableOpacity>
                {/* TITLE */}
                <Text
                    style={{
                        color: theme === 'dark' ? 'white' : 'black',
                        textAlign: 'center',
                        fontSize: 25,
                        flex: 1,
                        marginLeft: -30,
                        zIndex: 0,
                    }}
                >
                    Settings
                </Text>
            </View>
            {/* HEADER CONTAINER */}
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    height: 70,
                    marginTop: -20,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                }}
            >
                <Text
                    style={{
                        color: theme === 'dark' ? 'white' : 'black',
                        textAlign: 'left',
                        fontSize: 22,
                    }}
                >
                    Theme
                </Text>
                <DropDownPicker
                    style={{
                        backgroundColor: 'transparent',
                        width: 120,
                        borderColor: theme === 'dark' ? 'white' : 'black',
                        marginLeft: 130,
                    }}
                    setItems={setItems}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    onChangeValue={handleChangeTheme}
                    textStyle={{
                        color: theme === 'dark' ? 'white' : 'black',
                        textAlign: 'center',
                        backgroundColor: 'transparent',
                        fontSize: 18,
                    }}
                    containerStyle={{ backgroundColor: 'transparent' }}
                    dropDownContainerStyle={{
                        backgroundColor: 'transparent',
                        borderColor: theme === 'dark' ? 'white' : 'black',
                        width: 120,
                        marginLeft: 130,
                    }}
                    arrowIconStyle={{
                        backgroundColor: 'transparent',
                        tintColor: theme === 'dark' ? 'white' : 'black',
                    }}
                    activityIndicatorColor="white"
                    selectedItemContainerStyle={{
                        backgroundColor:
                            theme === 'dark' ? '#323232' : '#e0e0e0',
                    }}
                    showTickIcon={false}
                />
            </View>
        </SafeAreaView>
    );
};

export default Settings;
