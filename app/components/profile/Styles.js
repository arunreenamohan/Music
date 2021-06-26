import {StyleSheet} from 'react-native';
const SPACING = 20;
const AVATAR_SIZE = 70;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F5F5F5'
  },
  button:{
      backgroundColor:'white',
  },
  view:{
    padding: SPACING,
    marginBottom: SPACING,
   // backgroundColor: '#ffff',
    opacity: 0.8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 10,
    shadowRadius: 20,
   /// elevation: 1,
    borderWidth:1
  }
});

export {styles};