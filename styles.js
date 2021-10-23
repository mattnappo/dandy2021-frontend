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
  },

  input: {
    margin: 15,
    height: 40,
    width: 300,
    borderColor: '#000000',
    borderWidth: 1,
    color: '#000000',
    textAlign: 'center'
 },
});
