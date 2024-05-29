import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import BtnSaveTask from '../../components/tasks_comp/taskInfoPage/BtnSaveTask';
import HeaderInfoTask from '../../components/tasks_comp/taskInfoPage/HeaderInfoTask';
import { removeTasks, updateTasks } from '../../tasks/tasksSlice';
import ModalDelete from '../../components/global_comp/ModalDelete';
import TasksInfo from '../../components/tasks_comp/taskInfoPage/TasksInfo';
import { View } from 'react-native';

const TaskDetails = () => {
    const {
        id,
        taskTitle,
        tasks: tasksStr,
        fieldsAux: fieldsAuxStr,
    } = useLocalSearchParams();
    const tasksAux = JSON.parse(decodeURIComponent(tasksStr));
    const fieldsAux = JSON.parse(decodeURIComponent(fieldsAuxStr));
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalDeleteDelay, setModaDeleteDelay] = useState(false);
    const [fields, setFields] = useState(fieldsAux);
    const [title, setTitle] = useState(taskTitle);
    const [tasks, setTasks] = useState(tasksAux);

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

    //DELETE TASKS

    const handleTouchOutModal = useCallback(() => {
        setModalDelete(false);
        setTimeout(() => {
            setModaDeleteDelay(false);
        }, 600);
    }, []);
    const openModalDelete = useCallback(() => {
        setModalDelete(true);
        setModaDeleteDelay(true);
    }, []);

    const deleteTasks = () => {
        dispatch(removeTasks({ id: id }));
        setModalDelete(false);
        setModaDeleteDelay(false);
        router.back();
    };

    const updateTask = () => {
        const date = new Date();
        dispatch(
            updateTasks({
                id: id,
                title: title,
                tasks: tasks,
                date: `Updated: ${date.toLocaleDateString()}`,
                fields: fields,
            })
        );
        router.back();
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme === 'dark' ? '#000' : 'white',
                padding: 15,
            }}
        >
            <View style={{ flexDirection: 'column', flex: 1 }}>
                {/* GO BACK AND TITLE INPUT */}
                <HeaderInfoTask
                    theme={theme}
                    title={title}
                    typeTitle={typeTitle}
                    openModalDelete={openModalDelete}
                />
                {/* TASKS INPUT */}
                <TasksInfo
                    theme={theme}
                    tasks={tasks}
                    fields={fields}
                    addNewFieldTask={addNewFieldTask}
                    deleteFieldTask={deleteFieldTask}
                    handleTextChange={handleTextChange}
                    handleDoneTask={handleDoneTask}
                />

                {/* BTN´S SAVE*/}
                <BtnSaveTask theme={theme} updateTask={updateTask} />

                {/* MODAL DELETE */}
                <ModalDelete
                    modalDelete={modalDelete}
                    theme={theme}
                    handleTouchOutModal={handleTouchOutModal}
                    modalDeleteDelay={modalDeleteDelay}
                    deleteFunc={deleteTasks}
                />
            </View>
        </SafeAreaView>
    );
};

export default TaskDetails;
