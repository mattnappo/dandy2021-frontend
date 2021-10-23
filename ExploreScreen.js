import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { TestMap } from './TestMap';

export function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the explore screen</Text>
      <TestMap />
    </View>
  );
}
