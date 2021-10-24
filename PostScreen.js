import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, Text, View, Button, Picker, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import SwipeUpDown from 'react-native-swipe-up-down';
import CameraScreen from './CameraScreen';
import axios from 'axios';
import { styles } from './styles';
import reverseGeocodeLink from './common';

const HOST = "http://34.125.16.241:80";

localStorage.setItem("username", "Matt");

export function PostScreen() {
  const [title, onChangeTitle] = useState("");
  const [description, onChangeDescription] = useState("");
  const [location, setLocation] = useState({latitude: 0.0, longitude: 0.0});
  const [jobType, setJobType] = useState('environmental');
  const [locName, setLocName] = useState('');
  const [swipeRef, setSwipeRef] = useState(null);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    localStorage.setItem("username", "Matt");
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let curlocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: curlocation.coords.latitude,
        longitude: curlocation.coords.longitude,
      });

      let link = reverseGeocodeLink(curlocation.coords.latitude, curlocation.coords.longitude);
      console.log(link);

      fetch(link)
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data.addresses[0]['address']['freeformAddress']));
        setLocName(data.addresses[0]['address']['freeformAddress']);
      });
    })();
  }, []);

  const postJob = () => {
    if (title != "" && description != "" && location.latitude != 0 && location.longitude != 0
    && imageData != null) {
      let data = {
        user: localStorage.getItem("username"),
        longitude: location.longitude,
        latitude: location.latitude,
        image: imageData,
        comment: description,
        type: jobType,
        title: title,
        currentUser: "",
        points: 75,
      };

      // console.log(data);

      fetch('http://34.125.16.241:80/insertLocation/', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      createTwoButtonAlert('New Job', 'Posted new service job!');
    }
  }

  const createTwoButtonAlert = (messageTitle, messageMessage) => {
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
  };

  const pullData = (data) => {
    setImageData(data);
    swipeRef.showMini();
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTitle}
            value={title}
            placeholder="Job Title"
          />
          <TextInput
            style={styles.bigInput}
            onChangeText={onChangeDescription}
            value={description}
            placeholder="Description"
          />
        </SafeAreaView>
        
        <Text style={{fontWeight: 'normal', marginTop: 8, marginBottom: 8 }}>
          {locName == "" ? 'Loading location' : locName}
        </Text>
        
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.miniMap}
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
        </View>

        <Text style={{...styles.subtitle, textAlign: 'center'}}>Job Type</Text>
        <Picker
            selectedValue={jobType}
            style={{ height: 200, width: '100%' }}
            onValueChange={(itemValue, itemIndex) => setJobType(itemValue)}
        >
          <Picker.Item label="Animal Care" value="animal" />
          <Picker.Item label="Social" value="social" />
          <Picker.Item label="Environmental" value="environmental" />
          <Picker.Item label="Health" value="health" />
          <Picker.Item label="Tourism" value="tourism" />
        </Picker>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {
          imageData == null ?
          <Button
            onPress={() => {
              swipeRef.showFull();
            }}
            title="Add Image"
            color="#4287f5"
          /> : <View />
          }

          <Button
            onPress={postJob}
            title="Create Job"
            color="#4287f5"
          /> 
        </View>
      </View>

      <SwipeUpDown
          hasRef={ref => (setSwipeRef(ref))}
          itemFull={
            <CameraScreen func={pullData}/>
          }
          style={{ backgroundColor: '#fff' }}
          animation="easeInEaseOut"
      />
    </View>

  );
}