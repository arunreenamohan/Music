import React, {useState, useContext} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Context from '../Context';
import {styles} from './Styles';
import moment from 'moment';

const BG_IMG = '../images/bg.jpg';
const SPACING = 20;
const AVATAR_SIZE = 70;

const DetailedScreen = () => {
  const myContext = useContext(Context);
  const [musicData, setMusicData] = useState(myContext.musicDetails);
  return (
    <View style={styles.container}>
      <Image
        source={require(BG_IMG)}
        style={StyleSheet.absoluteFillObject}
        blurRadius={100}
      />
      <View style={styles.view}>
        <Image source={{uri: musicData.thumbnail}} style={styles.imagestyle} />
      </View>
      <View style={styles.detailsview}>
        <Text style={{fontSize: 25, fontWeight: '700'}}>{musicData.title}</Text>
        <Text style={{fontSize: 20, fontWeight: '700', opacity: 0.7}}>
          {musicData.album}
        </Text>
        <Text style={styles.createdAt_text}>
          {moment(musicData.createdAt).format('DD-MM-YYYY')}
        </Text>
      </View>
    </View>
  );
};
export default DetailedScreen;
