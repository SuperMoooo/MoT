import { TextInput } from 'react-native';
import React from 'react';

const NoteInfoMessage = ({ theme, messageInput, setMessageInput }) => {
    return (
        <TextInput
            style={{
                color: theme === 'dark' ? 'white' : 'black',
                fontSize: 18,
                textAlignVertical: 'top',
                flex: 1,
                width: '100%',
                lineHeight: 40,
            }}
            autoCorrect={true}
            multiline={true}
            selectionColor={theme === 'dark' ? '#d4b37f' : '#f7bb5c'}
            value={messageInput}
            onChangeText={(e) => setMessageInput(e)}
            cursorColor={theme === 'dark' ? '#d4b37f' : '#f7bb5c'}
        ></TextInput>
    );
};

export default NoteInfoMessage;
