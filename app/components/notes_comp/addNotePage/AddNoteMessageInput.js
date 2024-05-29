import { TextInput } from 'react-native';
import React from 'react';

const AddNoteMessageInput = ({ theme, message, typeMessage }) => {
    return (
        <TextInput
            value={message}
            onChangeText={(e) => typeMessage(e)}
            placeholder="Note"
            placeholderTextColor={'gray'}
            cursorColor={theme === 'dark' ? '#d4b37f' : '#f7bb5c'}
            multiline={true}
            autoCorrect={true}
            style={{
                color: theme === 'dark' ? '#fff' : '#000',
                fontSize: 18,
                width: '100%',
                marginTop: 30,
                textAlignVertical: 'top',
                flex: 1,
                lineHeight: 30,
            }}
        ></TextInput>
    );
};

export default AddNoteMessageInput;
