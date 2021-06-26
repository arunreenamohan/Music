import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AppNavigator from './app/components/navigation/AppNavigator';
import Context from './app/components/Context';
import {openDatabase} from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

var db = openDatabase({name: 'UserDatabase.db'});

const App = navigation => {
  const [musicDetails, setMusicDetails] = useState([]);
  useEffect(() => {
    // AsyncStorage.getItem('user_id').then(value =>
    //   navigation.replace(value === null ? 'Login' : 'Home'),
    // );
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), email  VARCHAR(50),mobile  INT(20), password VARCHAR(50))',
              [],
            );
          }
        },
      );
    });
  }, []);
  const contextSetting = {
    musicDetails: musicDetails,
  };
  return (
    <Context.Provider value={contextSetting}>
      <View
        style={{
          flex: 1,
        }}>
        <AppNavigator />
      </View>
    </Context.Provider>
  );
};
export default App;
