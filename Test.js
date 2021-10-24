import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert, Button, Image, TouchableOpacity, Modal, ImageViewer } from 'react-native';
import * as Location from 'expo-location';
import SwipeUpDown from 'react-native-swipe-up-down';
import testMarkers from './markers';
import 'localstorage-polyfill';
import axios from 'axios';

const HOST = "http://34.125.16.241:80";

export function MapWindow() {
  const [location, setLocation] = useState({latitude: 0.0, longitude: 0.0});
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    localStorage.setItem("username", "Matt");
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      // createTwoButtonAlert("Location found", JSON.stringify(location));
    })();
  }, []);

  useEffect(() => {
    /*
    axios({
      method: "GET",
      url: "https://API_URL...",
    })
      .then((response) => {
        setMarkers();
      })
      .catch((error) => {
        console.log(error);
      });
      */

      setMarkers(testMarkers);
  }, []);

  const createTwoButtonAlert = (messageTitle, messageMessage) =>
    Alert.alert(
      messageTitle,
      messageMessage,
      [
        {
          text: "Ok",
          style: "cancel"
        },
      ]
    );

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={{
          latitude: 43.1284168,
          longitude: -77.6283912,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >

        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Your Location"
          image={require("./assets/icons8-orientation-96.png")}
        />
      </MapView>

      <SwipeUpDown
          hasRef={ref => (setSwipeRef(ref))}
          itemFull={
            <View style={styles.panelContainer}>
              <Text style={styles.title}>{selectedPin.title} (by @{selectedPin.user})</Text>
              <Text style={{color: '#35b089'}}>{selectedPin.type}</Text>
              <Text style={{color: '#999'}}>{`${selectedPin.latitude}, ${selectedPin.longitude}\n`}</Text>
              <Text style={styles.title}>Description</Text>
              <Text>{selectedPin.comment + '\n'}</Text>
              <Text style={styles.title}>Status</Text>

              <Text style={{color: '#35b089'}}>
                {`+${selectedPin.points} pts/hr`}
              </Text>
              <Text>
                {selectedPin.currentUser == "" ?
                "Needs volunteer\n" : `@${selectedPin.currentUser} currently serving\n`}
              </Text>

              <Text style={styles.title}>Photo</Text>
              {/* <Text>{JSON.stringify(selectedPin)}</Text> */}
  {/* <Image src="https://img.icons8.com/color/48/000000/filled-star--v1.png"/> */}
              <Image
                style={{
                  marginTop: 20,
                  marginBottom: 15,
                  borderRadius: 20,
                  height: Dimensions.get('window').height - 600,

                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center', 
                }}
                source={{ uri: selectedPin.image}} tint="light"
              />

              {
                selectedPin.currentUser == "" ? 
                <Button
                  onPress={markJobInProgress}
                  title="Start job"
                  color="#4287f5"
                /> : <Text style={styles.started}>Job Already Started</Text>
              }
            </View>
          }
          style={{ backgroundColor: '#fff' }}
          animation="easeInEaseOut"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    //width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height,
    width: '100%',
    height: '100%',
  },
  started: {
    fontWeight: 'bold',
    marginTop: 12,
    color: '#35b089',
    textAlign: 'center',
  }
});