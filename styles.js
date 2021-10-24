import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
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
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 100, // not working
    width: '100%',
  },
  centerting: {
    alignItems: 'center',
    display: 'flex',
    alignItems: 'center',
    marginTop: 100,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: "#ffffff"
 
  },
});
