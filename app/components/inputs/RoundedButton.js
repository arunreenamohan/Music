import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const RoundButton = ({title, onPress, buttonStyle, textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle,styles.button]}>
      <Text style={[textStyle,styles.Text]}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    height: 50,
    width: width / 2,
    margin: 20,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity:2,
    elevation:10,
    borderRadius:25
  },
  Text:{
      fontSize:16,
      textTransform:'uppercase',
      color:'black'

  }
});

export default RoundButton;