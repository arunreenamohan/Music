import {StyleSheet} from 'react-native';
const SPACING = 20;
const AVATAR_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flexDirection: 'row',
    padding: SPACING,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsview: {
    borderWidth: 1,
    padding: SPACING,
    margin: 10,
    borderRadius: 20,
  },
  createdAt_text: {
    fontSize: 15,
    fontWeight: '700',
    opacity: 0.8,
    color: 'lightblue',
  },
  imagestyle: {
    width: AVATAR_SIZE * 3,
    height: AVATAR_SIZE * 3,
    borderRadius: AVATAR_SIZE * 3,
    marginRight: SPACING / 2,
  },
});

export {styles};
