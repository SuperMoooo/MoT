import { SafeAreaView, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import HeaderHomeTasks from '../../components/tasks_comp/mainPage/HeaderHomeTasks';
import { useDispatch, useSelector } from 'react-redux';
import TasksScroll from '../../components/tasks_comp/mainPage/TasksScroll';
import { removeTasks, setTasks, updateTasks } from '../../tasks/tasksSlice';
import ModalDelete from '../../components/global_comp/ModalDelete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddTaskGo from '../../components/tasks_comp/mainPage/AddTaskGo';
import LongPressBar from '../../components/global_comp/LongPressBar.js';

const tarefas = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);
    const tasks = useSelector((state) => state.tasks);
    const [longPress, setLongPress] = useState(false);
    const [longPressDelay, setLongPressDelay] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalDeleteDelay, setModaDeleteDelay] = useState(false);
    const [currentDeleteId, setCurrentDeleteId] = useState(null);

    //GET TASKS LOCAL STORAGE
    useEffect(() => {
        async function getTasks() {
            try {
                const tasks = await AsyncStorage.getItem('tasks');
                if (tasks !== null) {
                    dispatch(setTasks({ tasks: JSON.parse(tasks) }));
                }
            } catch (error) {
                console.error(
                    'Error retrieving tasks from AsyncStorage:',
                    error
                );
            }
        }

        getTasks();
    }, []);

    //DELETE TASK
    const handleTouchOutModal = useCallback(() => {
        setModalDelete(false);
        setTimeout(() => {
            setModaDeleteDelay(false);
        }, 350);
    }, []);

    const openModalDelete = (id) => {
        setModalDelete(true);
        setModaDeleteDelay(true);
        setCurrentDeleteId(id);
    };

    const deleteNote = () => {
        dispatch(removeTasks({ id: currentDeleteId }));
        setCurrentDeleteId(null);
        setModalDelete(false);
        setModaDeleteDelay(false);
    };

    //LONG PRESS FUNC
    const longPressHandlerFalse = useCallback(() => {
        setLongPress(false);
        setTimeout(() => {
            setLongPressDelay(false);
        }, 500);
    }, []);

    const longPressHandlerTrue = useCallback(() => {
        setLongPress(true);
        setLongPressDelay(true);
    }, []);

    return (
        <SafeAreaView
            style={{
                backgroundColor: theme === 'dark' ? '#000' : 'white',
                flex: 1,
            }}
        >
            <View style={{ flexDirection: 'column', flex: 1, padding: 15 }}>
                {/* HEADER - SEARCH & SETTINGS ICON */}
                <HeaderHomeTasks
                    theme={theme}
                    search={search}
                    setSearch={setSearch}
                />
                {/* ALL TASKS */}
                <TasksScroll
                    tasks={tasks}
                    theme={theme}
                    longPress={longPress}
                    longPressHandlerTrue={longPressHandlerTrue}
                    search={search}
                    openModalDelete={openModalDelete}
                />
            </View>
            <AddTaskGo theme={theme} />
            <LongPressBar
                longPress={longPress}
                longPressDelay={longPressDelay}
                longPressHandlerFalse={longPressHandlerFalse}
                theme={theme}
            />
            <ModalDelete
                modalDelete={modalDelete}
                theme={theme}
                handleTouchOutModal={handleTouchOutModal}
                modalDeleteDelay={modalDeleteDelay}
                deleteFunc={deleteNote}
            />
        </SafeAreaView>
    );
};

export default tarefas;
