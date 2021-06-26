import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert
} from 'react-native';
import React, {useEffect} from 'react';
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../login/Login';
import Signup from '../signup/Signup';
import Home from '../home/Home';
import DetailedScreen from '../details/DetailedScreen';
import Profile from '../profile/Profile';
import SplashScreen from '../splashscreen/SplashScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = () => {
  const navigation = useNavigation();
  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Image
          source={require('../images/menu.png')}
          style={{
            width: 25,
            height: 25,
            marginLeft: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

function AppNavigator({navigation}) {
  // useEffect(() => {
  //   AsyncStorage.getItem('user_id').then(
  //     value => navigation.replace(value === null ? 'Login' : 'Home'),
  //     (global.value = value),
  //   );
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login Page', //Set Header Title
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Home"
          component={firstScreenStack}
          options={{
            title: '', //Set Header Title
            headerLeft: () => (
              <NavigationDrawerStructure navigationProps={navigation} />
            ),
            headerStyle: {
              backgroundColor: '#ffff', //Set Header color
              opacity: 0.8,
            },
            headerLeftContainerStyle: {
              padding: 20,
            },
            headerTintColor: 'gray', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="DetailedScreen"
          component={DetailedScreen}
          options={{
            title: 'Detailed Page', //Set Header Titl
          }}
        />

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            title: 'Signup Page', //Set Header Title
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile Page', //Set Header Title
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function CustomDrawerContent(props,navigation) {
 const logout = async () =>{
   await AsyncStorage.removeItem('user_id');
  props.navigation.push('Login');
 }
  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem label="Logout" onPress={logout} />
    </SafeAreaView>
  );
}
function firstScreenStack() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#008080',
        itemStyle: {marginVertical: 5},
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{drawerLabel: 'Home'}}
        component={Home}
      />
      <Drawer.Screen
        name="Profile"
        options={{drawerLabel: 'Profile'}}
        component={Profile}
      />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
