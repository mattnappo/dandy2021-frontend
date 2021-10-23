import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { MapWindow } from './MapWindow';

export function ExploreScreen() {
  return (
    <View style={styles.container}>
      <MapWindow />
    </View>
  );
}
