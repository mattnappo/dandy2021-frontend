import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '18px',
    height: '18px',
    backgroundColor: '#000',
  },
  map: {
    //...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red',
  }
});
