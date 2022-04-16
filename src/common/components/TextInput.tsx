import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { black, grey800, primary, white } from '../colors';

const MyTextInput = ({
  placeholder,
  value,
  setValue,
  onSubmitEditing,
}: any) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={grey800}
        style={styles.input}
        secureTextEntry={false}
        value={value}
        returnKeyType="done"
        onChangeText={text => {
          setValue(text);
        }}
        onSubmitEditing={() => {
          onSubmitEditing && onSubmitEditing();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 30,
    marginTop: 10,
    width: 320,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: primary,
    backgroundColor: white,
  },
  input: {
    color: black,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default MyTextInput;
