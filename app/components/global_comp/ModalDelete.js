import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';

const ModalDelete = ({
    modalDelete,
    theme,
    handleTouchOutModal,
    modalDeleteDelay,
    deleteFunc,
}) => {
    return (
        <Pressable
            style={{
                display: modalDeleteDelay ? 'flex' : 'none',
                flex: 1,
                width: '100%',
                height: '100%',
                alignSelf: 'center',
                justifyContent: 'flex-end',
                alignItems: 'center',
                zIndex: 9999,
                position: 'absolute',
                backgroundColor:
                    theme === 'dark'
                        ? 'rgba(43, 43, 43,0.5)'
                        : 'rgba(232, 232, 232,0.5)',
                top: 0,
                left: 0,
            }}
            onPress={handleTouchOutModal}
        >
            <Animatable.View
                animation={modalDelete ? 'fadeInUp' : 'fadeOutDown'}
                duration={200}
                style={{
                    backgroundColor: theme === 'dark' ? '#323232' : 'white',
                    borderColor: theme !== 'dark' && '#e0e0e0',
                    borderWidth: theme === 'dark' ? 0 : 1,
                    width: '100%',
                    height: '25%',
                    zIndex: 99999,
                    position: 'relative',
                    bottom: -3,
                    left: 0,
                    display: 'flex',
                    borderTopStartRadius: 30,
                    borderTopEndRadius: 30,
                    shadowColor: theme !== 'dark' && '#000',
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },
                    shadowOpacity: 0.46,
                    shadowRadius: 11.14,

                    elevation: 17,
                }}
            >
                <Text
                    style={{
                        color: theme === 'dark' ? 'white' : 'black',
                        fontSize: 25,
                        margin: 20,
                        textAlign: 'center',
                    }}
                >
                    Delete Note?
                </Text>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor:
                                theme === 'dark' ? '#3d3d3d' : '#f5f5f5',
                            borderWidth: 1,
                            borderRadius: 50,
                            padding: 15,
                            width: '40%',
                            borderColor:
                                theme === 'dark' ? '#3d3d3d' : '#e0e0e0',
                        }}
                        onPress={handleTouchOutModal}
                    >
                        <Text
                            style={{
                                color: theme === 'dark' ? 'white' : 'black',
                                fontSize: 25,
                                textAlign: 'center',
                            }}
                        >
                            CANCEL
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor:
                                theme === 'dark' ? '#3d3d3d' : '#f5f5f5',
                            borderWidth: 1,
                            borderRadius: 50,
                            padding: 15,
                            width: '40%',
                            borderColor:
                                theme === 'dark' ? '#3d3d3d' : '#e0e0e0',
                        }}
                        onPress={deleteFunc}
                    >
                        <Text
                            style={{
                                color: theme === 'dark' ? '#c2716d' : '#f74639',
                                fontSize: 25,
                                textAlign: 'center',
                            }}
                        >
                            DELETE
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </Pressable>
    );
};

export default ModalDelete;
