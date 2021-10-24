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
    flex: 1,
  },
  innerContainer: {
    backgroundColor: '#fff',
    height: '100%',
    flex: 1,
    margin: 15,
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
    height: 40,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    color: '#000000',
  }, 
  bigInput: {
    height: 200,
    paddingHorizontal: 10,
    width: '100%',
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
  miniMap: {
    flex: 1,
    marginTop: 5,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 12,
    height: 300,
    width: '100%',
  },
});
