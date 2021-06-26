import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './Styles';
import {TextInputs} from '../inputs/TextInputs';
import RoundButton from '../inputs/RoundedButton';
import {openDatabase} from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BG_IMG = '../images/bg.jpg';
const SPACING = 20;
const AVATAR_SIZE = 70;
var db = openDatabase({name: 'UserDatabase.db'});
const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
 
  const onLoginPress = () => {
    if (name === '' || password === '') {
      alert('Please enter your name and password!');
      return;
    }
    db.transaction(tx => {
      const sql = `SELECT * FROM table_user WHERE name='${name}'`;
      tx.executeSql(sql, [], async (tx, results) => {
        const len = results.rows.length;
        if (!len) {
          alert('This account does not exist!');
        } else {
          const row = results.rows.item(0);
          if (password === row.password) {
            const jsonUserId = JSON.stringify(row.user_id);
            await AsyncStorage.setItem('user_id', jsonUserId);
            console.log('userid', row.user_id);
            navigation.navigate('Home');
            return;
          }
          alert('Authentication failed!');
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
        placeholder="Username"
        changeText={name => setName(name)}
        keyboardType="default"
      />
      <TextInputs
        placeholder="Password"
        keyboardType="default"
        secureTextEntry={true}
        changeText={password => setPassword(password)}
      />
      <RoundButton
        title="Login"
        onPress={onLoginPress}
        buttonStyle={styles.button}></RoundButton>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={styles.touchbleopacity}>
        <Text style={styles.text}>Create an account ?</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Login;
