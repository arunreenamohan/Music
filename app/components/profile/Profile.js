import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {styles} from './Styles';
import {openDatabase} from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BG_IMG = '../images/bg.jpg';

var db = openDatabase({name: 'UserDatabase.db'});
const Profile = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    let value = await AsyncStorage.getItem('user_id');
    console.log('goof', value);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [value],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
            console.log(results.rows.item(0));
          } else {
            alert('No user found');
          }
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require(BG_IMG)}
        style={StyleSheet.absoluteFillObject}
        blurRadius={100}
      />
      <View
        style={styles.view}>
        <Text style={{fontSize: 30, fontWeight: '700'}}>
          {userData.name === undefined ? null : userData.name.toUpperCase() }
        </Text>
        <Text style={{fontSize: 15, opacity: 0.6}}>{userData.mobile}</Text>
        <Text style={{fontSize: 15, opacity: 0.6}}>{userData.email}</Text>
      </View>
    </View>
  );
};
export default Profile;
