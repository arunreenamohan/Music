import React from 'react';
import {View, TextInput, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const TextInputs = ({
  value,
  autoCapitalize,
  changeText,
  placeholder,
  secureTextEntry,
  error,
  errorStyles,
  onSubmitEditing,
  rel,
  returnKeyType,
  keyboardType,
  newStyles,
  autoFocus,
  multiline,
  maxLength,
}) => {
  const {textInput, errorStyle} = InputFieldStyles;
  return (
    <View>
      <View style={{marginTop: 20}}>
        <TextInput
          ref={rel}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          autoCorrect={false}
          value={value}
          onChangeText={changeText}
          underlineColorAndroid={'transparent'}
          blurOnSubmit={true}
          autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
          style={
            error
              ? errorStyles
                ? errorStyles
                : errorStyle
              : newStyles
              ? newStyles
              : textInput
          }
          autoFocus={autoFocus}
          multiline={multiline}
          maxLength={maxLength}
          placeholderTextColor="#008080"
        />
      </View>
    </View>
  );
};

const InputFieldStyles = {
  inputHeight: {
    height: 50,
  },
  textInput: {
   // height: 50,
    backgroundColor: 'white',
    color: '#008080',
    paddingHorizontal:20,
    borderRadius: 25,
    width: 250
  },
  errorStyle: {
    height: 35,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 2,
    color: '#000',
    paddingHorizontal: 8,
  },
  requireField: {
    color: 'red',
  },
};

export {TextInputs};
