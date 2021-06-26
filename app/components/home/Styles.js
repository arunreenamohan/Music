import {StyleSheet} from 'react-native';
const SPACING = 20;
const AVATAR_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  renderItem:{
    flexDirection: 'row',
    padding: SPACING,
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
  }
});

export {styles};
