import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExploreScreen } from './ExploreScreen';
import { PostScreen } from './PostScreen';
import { AccountScreen } from './AccountScreen';
import TestSwipeUp from './TestSwipeUp';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tinyLogo: {
    width: 24,
    height: 24,
  },
});

function MyTabs() {
  const screenOptions = (route, color) => {
    let name;
  
    switch (route.name) {
      case 'Explore Jobs':
        name = 'https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-find-hotel-kiranshastry-lineal-kiranshastry.png';
        break;
      case 'New Job':
        name = 'https://img.icons8.com/ios-glyphs/30/000000/plus.png';
        break;
      case 'Account':
        name = "https://img.icons8.com/material-sharp/24/000000/guest-male.png";
        break;
      default:
        break;
    }
  
    return <Image
      style={styles.tinyLogo}
      source={{
        uri: name,
      }}
    />;

  };

  return (
    //<TestSwipeUp />
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => screenOptions(route, color),
      })}>
      <Tab.Screen name="Explore Jobs" component={ExploreScreen}/>
      <Tab.Screen name="New Job" component={PostScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
