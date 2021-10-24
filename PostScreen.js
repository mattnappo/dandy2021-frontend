import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, Text, View, Button, Picker } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from './styles';

export function PostScreen() {
  const [title, onChangeTitle] = useState(null);
  const [description, onChangeDescription] = useState(null);
  const [location, setLocation] = useState({latitude: 0.0, longitude: 0.0});
  const [jobType, setJobType] = useState('environmental');

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
    })();
  }, []);

  const postJob = () => {
    let data = {
      title: title,
      message: description,
      latitude: location.latitude,
      longitude: location.longitude,
      type: jobType,
    };
    console.log(data);
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
        
        <Text style={{...styles.subtitle, marginTop: 14}}>Location:
          <Text style={{fontWeight: 'normal'}}>
            {` ${location.latitude.toString().substring(0, 8)}, ${location.longitude.toString().substring(0, 8)}`}
          </Text>
        </Text>
        
        <View style={styles.mapContainer}>
          <MapView
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