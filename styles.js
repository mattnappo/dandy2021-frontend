import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
  },
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
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
  },
  input: {
    margin: 15,
    height: 40,
    paddingHorizontal: 10,
    width: '92%',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    color: '#000000',
  }, 
  bigInput: {
    margin: 15,
    height: 200,
    paddingHorizontal: 10,
    width: '92%',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    color: '#000000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
