import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { addTasks } from '../../tasks/tasksSlice';
import { nanoid } from '@reduxjs/toolkit';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderAddTask from '../../components/tasks_comp/addTaskPage/HeaderAddTask';
import InsertTaskBtn from '../../components/tasks_comp/addTaskPage/InsertTaskBtn';
import AddTasksInput from '../../components/tasks_comp/addTaskPage/AddTasksInput';
import { Alert } from 'react-native';

const NewTask = () => {
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState([{ taskName: '', isDone: false }]);
    const [fields, setFields] = useState([]);
    const theme = useSelector((state) => state.theme);

    const dispacth = useDispatch();
    //ADD TASK TO MAIN PAGE
    const addTask = () => {
        if (title !== '' && tasks[0] !== '') {
            const date = new Date();
            const newTask = {
                id: title + nanoid(),
                title: title,
                tasks: tasks,
                date: date.toLocaleDateString(),
                fields: fields,
            };
            dispacth(addTasks(newTask));
            router.back();
        } else {
            Alert.alert('ERROR!', 'Fill all camps!');
        }
    };

    const typeTitle = useCallback((text) => {
        setTitle(text);
    }, []);

    // ADD TASK FIELD COMPONENT
    const addNewFieldTask = () => {
        if (fields.length < 6) {
            // ADD NEW FIELD
            setFields([
                ...fields,
                {
                    fieldNumber: fields.length + 1,
                },
            ]);
            // ADD NEW TASK EMPTY
            setTasks([...tasks, { taskName: '', isDone: false }]);
        } else {
            Alert.alert('ERROR!', 'You can add only 7 tasks!');
        }
    };

    const deleteFieldTask = (taskIndex) => {
        setTasks((prevTasks) => {
            const newTasks = prevTasks.filter(
                (_, index) => index !== taskIndex
            );
            return newTasks;
        });

        setFields((prevFields) => {
            const newFields = prevFields
                .filter((field) => field.fieldNumber !== taskIndex)
                .map((field) => ({
                    ...field,
                    fieldNumber:
                        field.fieldNumber > taskIndex
                            ? field.fieldNumber - 1
                            : field.fieldNumber,
                }));
            return newFields;
        });
    };

    const handleTextChange = (e, index) => {
        const newTasks = [...tasks];
        // EDIT TASK EMPTY
        newTasks[index].taskName = e;
        setTasks(newTasks);
    };

    const handleDoneTask = (index) => {
        const newTasks = [...tasks];
        // EDIT DONE OR NOT
        newTasks[index].isDone = !newTasks[index].isDone;
        setTasks(newTasks);
    };
    return (
        <SafeAreaView
            style={{
                padding: 15,
                flex: 1,
                alignItems: 'flex-start',
                backgroundColor: theme === 'dark' ? '#000' : 'white',
                justifyContent: 'flex-start',
                position: 'relative',
            }}
        >
            {/* GO BACK AND TITLE INPUT */}
            <HeaderAddTask theme={theme} title={title} typeTitle={typeTitle} />
            {/* TASKS INPUT */}
            <AddTasksInput
                theme={theme}
                tasks={tasks}
                fields={fields}
                addNewFieldTask={addNewFieldTask}
                deleteFieldTask={deleteFieldTask}
                handleTextChange={handleTextChange}
                handleDoneTask={handleDoneTask}
            />

            {/* INSERT TASK */}
            <InsertTaskBtn theme={theme} addTasks={addTask} />
        </SafeAreaView>
    );
};

export default NewTask;
