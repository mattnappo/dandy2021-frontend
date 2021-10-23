import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import * as Location from 'expo-location';
import SwipeUpDown from 'react-native-swipe-up-down';
import testMarkers from './markers';
import axios from 'axios';

export function MapWindow() {
  const [markers, setMarkers] = useState(null);
  const [location, setLocation] = useState({latitude: 0.0, longitude: 0.0});
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
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

        {markers &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              onPress={(loc) => swipeUpDownRef.showFull()}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={`${marker.title} (@${marker.user})`}
              description={marker.comment}
              image={require("./assets/icons8-place-marker-100.png")}
            />
          ))}

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
          hasRef={ref => (swipeUpDownRef = ref)}
          itemFull={
            <View style={styles.panelContainer}>
              <Text style={styles.instructions}>
                Swipe down to close
              </Text>
            </View>
          }
          swipeHeight={0}
          onShowMini={() => console.log('mini')}
          onShowFull={() => console.log('full')}
          disablePressToShow={false}
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  panelContainer: {
    height: 300,
    backgroundColor: 'red'
  }
});
