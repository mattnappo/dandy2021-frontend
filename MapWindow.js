import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, TextInput, View, Dimensions, Alert, Button, Image, TouchableOpacity, Modal, ImageViewer } from 'react-native';
import * as Location from 'expo-location';
import SwipeUpDown from 'react-native-swipe-up-down';
import testMarkers from './markers';
import 'localstorage-polyfill';
import axios from 'axios';

const HOST = "http://34.125.16.241:80";

localStorage.setItem("username", "N8");

const cap = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export function MapWindow() {
  const [markers, setMarkers] = useState(null);
  const [location, setLocation] = useState({latitude: 0.0, longitude: 0.0});
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedPin, setSelectedPin] = useState({
    id: 0,
    title: "",
    user: "",
    latitude: "",
    longitude: "",
    comment: "",
    type: "",
    image: "",
    currentUser: "", 
    points: 0,
  });
  const [swipeRef, setSwipeRef] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("username", "N8");
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

  const updateMarkers = () => {
    data = {
      'table': 'Locations'
    }
    axios({
      method: "POST",
      url: "http://34.125.16.241:80/read/", data
    })
      .then((res) => {
        console.log(res.data);
        let newMarkers = [];
        for (let i = 0; i < res.data.length; i++) {
          newMarkers.push({
            id: res.data[i][0],
            name: res.data[i][1],
            longitude: res.data[i][2],
            latitude: res.data[i][3],
            image: res.data[i][4],
            comment: res.data[i][5],
            type: res.data[i][6],
            title: res.data[i][7],
            currentUser: res.data[i][8],
            points: res.data[i][9],
          });
        }
        setMarkers(newMarkers);
      })
      .catch((error) => {
        console.log(error);
      });

      // setMarkers(testMarkers);
  };

  useEffect(updateMarkers, []);

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

  const markJobInProgress = () => {
    createTwoButtonAlert("New Job", "You've started a new job! Mark it as completed in the Account page.");
    const form = {
      table: "Locations",
      setPos: "currentUser",
      newValue: localStorage.getItem("username"),
      where: 'id',
      whereValue: selectedPin.id,
    };

    console.log(form);

    axios.post(`${HOST}/update/`, { form })
    .then(res => {
      console.log(res);
      console.log(res.data);
    });

    setSelectedPin({ ...selectedPin, currentUser: localStorage.getItem("username") });
    updateMarkers();
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
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
              onPress={(loc) => {
                setSelectedPin({
                  id: marker.id,
                  title: marker.title,
                  user: marker.user,
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                  comment: marker.comment,
                  type: marker.type,
                  image: marker.image,
                  currentUser: marker.currentUser,
                  points: marker.points,
                });
                swipeRef.showFull();
              }}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={`${marker.title} (@${marker.user})`}
              description={marker.comment}
              image={
                marker.currentUser == "" ?
                  require("./assets/icons8-place-marker-100.png") : 
                  require("./assets/progressPin.png")
              }
            />
          ))}

        {/* <Text>{JSON.stringify(markers)}</Text> */}
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
              <Text style={{color: '#35b089'}}>{cap(selectedPin.type)}</Text>
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
                /> : <Text style={styles.started}>Job Already Started (@{selectedPin.currentUser})</Text>
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
