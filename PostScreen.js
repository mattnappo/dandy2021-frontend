import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, Text, View, Button, Picker, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { styles } from './styles';
// import { reverseGeocodeLink } from './common';

const HOST = "http://34.125.16.241:80";

export function PostScreen() {
  const [title, onChangeTitle] = useState("");
  const [description, onChangeDescription] = useState("");
  const [location, setLocation] = useState({latitude: 0.0, longitude: 0.0});
  const [jobType, setJobType] = useState('environmental');
  const [locName, setLocName] = useState('');

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
    })();
  }, []);

  const postJob = () => {
    if (title != "" && description != "" && location.latitude != 0 && location.longitude != 0) {
      let data = {
        user: localStorage.getItem("username"),
        longitude: location.longitude,
        latitude: location.latitude,
        image: null,
        comment: description,
        type: jobType,
        title: title,
        currentUser: "",
        points: 75,
      };

      console.log(data);

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
        
        <Text style={{...styles.subtitle, marginTop: 14}}>Location:
          <Text style={{fontWeight: 'normal'}}>
            {` ${location.latitude.toString().substring(0, 8)}, ${location.longitude.toString().substring(0, 8)}`}
          </Text>
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
        
        <Button
          onPress={postJob}
          title="Create Job"
          color="#4287f5"
        /> 
      </View>
    </View>
  );
}