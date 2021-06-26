import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './Styles';
import Context from '../Context';
import {useNavigation} from '@react-navigation/native';
import moment from "moment";


const BG_IMG = '../images/bg.jpg';
const SPACING = 20;
const AVATAR_SIZE = 70;

const Home = () => {
  const myContext = useContext(Context);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [musicData, setMusicData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);

  useEffect(() => {
    console.log(myContext);
    getMusicDetails();
    return () => {
      setMusicData([]);
    };
  }, []);
  const getMusicDetails = () => {
    if (!loading && !isListEnd) {
      console.log('getData');
      setLoading(true);
      fetch(
        'https://6006c4d63698a80017de1f20.mockapi.io/songs?page=2&limit=' +
          offset,
      )
        .then(res => res.json())
        .then(result => {
          console.log(result.length);
          if (result.length > 0) {
            setOffset(offset + 1);
            setMusicData([...musicData, ...result]);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        });
    }
  };
  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="black" size="large" />
        ) : null}
      </View>
    );
  };

  const detailPage = item => {
    console.log('item', item);
    myContext.musicDetails = item;
    navigation.navigate('DetailedScreen');
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => detailPage(item)}
        style={{
         flexDirection:'row',
         padding: SPACING/1.23,
         marginBottom: SPACING/1.23,
         borderWidth:1,
         borderRadius:20
        }}>
        <Image
          source={{uri: item.thumbnail}}
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: AVATAR_SIZE,
            marginRight: SPACING / 2,
          }}
        />
        <View>
          <Text style={{fontSize: 22, fontWeight: '700'}}>{item.title}</Text>
          <Text style={{fontSize: 18, opacity: 0.7}}>{moment(item.createdAt).format('DD-MM-YYYY')}</Text>
          <Text style={{fontSize: 14, opacity: 0.8, color: 'skyblue'}}>
            {item.album}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
 
  return (
    <View style={styles.container}>
      <Image
        source={require(BG_IMG)}
        style={StyleSheet.absoluteFillObject}
        blurRadius={100}
      />
      <FlatList
        data={musicData}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={getMusicDetails}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
export default Home;
