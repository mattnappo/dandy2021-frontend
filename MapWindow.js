import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Text, View } from 'react-native';
import { styles } from './styles';

export function MapWindow() {
  return (
    <View style={styles.map}>
      <MapView
        provider={ PROVIDER_GOOGLE }
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}
