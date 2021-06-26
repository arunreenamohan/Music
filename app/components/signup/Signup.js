import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {styles} from './Styles';
import {TextInputs} from '../inputs/TextInputs';
import RoundButton from '../inputs/RoundedButton';
import {useNavigation} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';

const BG_IMG = '../images/bg.jpg';
const SPACING = 20;
const AVATAR_SIZE = 70;

var db = openDatabase({name: 'UserDatabase.db'});

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(text);
  };

  const register_user = () => {
    console.log(name, email, mobile, password);

    if (!name) {
      alert('Please fill name');
      return;
    }
    if (!email) {
      alert('Please fill Contact Number');
      return;
    }
    if (!mobile) {
      alert('Please fill Address');
      return;
    }
    if (!password) {
      alert('Please fill Address');
      return;
    }
    if (!validate(email)) {
      alert('Please enter valid email');
      return;
    }

    db.transaction(function (tx) {
      const sql = `SELECT * FROM table_user WHERE name='${name}'`;
      tx.executeSql(sql, [], (tx, results) => {
        const len = results.rows.length;

        if (!len) {
          tx.executeSql(
            'INSERT INTO table_user (name, email, mobile,password) VALUES (?,?,?,?)',
            [name, email, mobile, password],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'You are Registered Successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('Login'),
                    },
                  ],
                  {cancelable: false},
                );
              } else alert('Registration Failed');
            },
          );
        } else {
          alert('The account already exist');
        }
      });
    });
  };
  return (
    <View style={styles.container}>
      <Image
        source={require(BG_IMG)}
        style={StyleSheet.absoluteFillObject}
        blurRadius={100}
      />
      <TextInputs
        placeholder="Name"
        keyboardType="default"
        changeText={name => setName(name)}
      />
      <TextInputs
        placeholder="Email"
        keyboardType="email-address"
        changeText={email => setEmail(email)}
      />
      <TextInputs
        placeholder="Mobile"
        keyboardType="number-pad"
        changeText={mobile => setMobile(mobile)}
        maxLength={10}
      />
      <TextInputs
        placeholder="Password"
        keyboardType="default"
        secureTextEntry={true}
        changeText={password => setPassword(password)}
      />
      <RoundButton
        title="Signup"
        onPress={register_user}
        buttonStyle={styles.button}></RoundButton>
    </View>
  );
};
export default Signup;
