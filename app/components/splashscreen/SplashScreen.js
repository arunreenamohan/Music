import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './Styles';

const BG_IMG = '../images/bg.jpg';
const SPACING = 20;
const AVATAR_SIZE = 70;
const SplashScreen = ({props, navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('user_id').then(value =>
        navigation.replace(value === null ? 'Login' : 'Home'),
      );
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require(BG_IMG)}
        style={StyleSheet.absoluteFillObject}
        blurRadius={100}
      />
      <View
        style={{
         // flexDirection: 'row',
          padding: SPACING*2,
          marginBottom: SPACING,
          backgroundColor: '#ffff',
          opacity: 0.8,
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: {
            width: 10,
            height: 10,
          },
          shadowOpacity: 10,
          shadowRadius: 20,
          elevation: 10,
        }}>
        <Text style={styles.textStyle}>Music</Text>
        <ActivityIndicator
          animating={animating}
          color="#008080"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
