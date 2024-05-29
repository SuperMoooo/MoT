import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const TasksInfo = ({
    theme,
    tasks,
    fields,
    addNewFieldTask,
    deleteFieldTask,
    handleTextChange,
    handleDoneTask,
}) => {
    return (
        <>
            <View>
                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <BouncyCheckbox
                        size={35}
                        fillColor={theme === 'dark' ? '#d4b37f' : '#f7bb5c'}
                        innerIconStyle={{ borderWidth: 1 }}
                        iconImageStyle={{ borderWidth: 8 }}
                        onPress={() => handleDoneTask(0)}
                        isChecked={tasks[0].isDone}
                    ></BouncyCheckbox>
                    <TextInput
                        value={tasks[0].taskName}
                        onChangeText={(e) => handleTextChange(e, 0)}
                        placeholder="Task"
                        placeholderTextColor={'gray'}
                        cursorColor={theme === 'dark' ? '#d4b37f' : '#f7bb5c'}
                        autoCorrect={true}
                        style={{
                            color: theme === 'dark' ? '#fff' : '#000',
                            fontSize: 20,
                            width: '100%',
                            textAlignVertical: 'top',
                            lineHeight: 30,
                            textDecorationLine: tasks[0].isDone
                                ? 'line-through'
                                : 'none',
                        }}
                    ></TextInput>
                </View>
                {fields.map((field) => {
                    return (
                        <View
                            key={field.fieldNumber}
                            style={{
                                flexDirection: 'row',
                                position: 'relative',
                                marginTop: 30,
                                width: '80%',
                            }}
                        >
                            <BouncyCheckbox
                                size={35}
                                fillColor={
                                    theme === 'dark' ? '#d4b37f' : '#f7bb5c'
                                }
                                innerIconStyle={{ borderWidth: 1 }}
                                iconImageStyle={{ borderWidth: 8 }}
                                onPress={() =>
                                    handleDoneTask(field.fieldNumber)
                                }
                                isChecked={tasks[field.fieldNumber].isDone}
                            ></BouncyCheckbox>
                            <TextInput
                                value={tasks[field.fieldNumber].taskName}
                                onChangeText={(e) =>
                                    handleTextChange(e, field.fieldNumber)
                                }
                                placeholder="Task"
                                placeholderTextColor={'gray'}
                                cursorColor={
                                    theme === 'dark' ? '#d4b37f' : '#f7bb5c'
                                }
                                autoCorrect={true}
                                style={{
                                    color: theme === 'dark' ? '#fff' : '#000',
                                    fontSize: 20,
                                    width: '100%',
                                    textAlignVertical: 'top',
                                    lineHeight: 30,
                                    textDecorationLine: tasks[field.fieldNumber]
                                        .isDone
                                        ? 'line-through'
                                        : 'none',
                                }}
                            ></TextInput>
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: -50,
                                }}
                                onPress={() =>
                                    deleteFieldTask(field.fieldNumber)
                                }
                            >
                                <AntDesign
                                    name="delete"
                                    size={35}
                                    color={
                                        theme === 'dark' ? '#c2716d' : '#f74639'
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    );
                })}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        display: tasks[0].taskName !== '' ? 'flex' : 'none',
                    }}
                >
                    <TouchableOpacity
                        onPress={addNewFieldTask}
                        style={{
                            borderColor:
                                theme === 'dark' ? '#d4b37f' : '#f7bb5c',
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: theme === 'dark' ? '#d4b37f' : '#f7bb5c',
                                fontSize: 18,
                                textAlign: 'center',
                            }}
                        >
                            Add another task
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default TasksInfo;
