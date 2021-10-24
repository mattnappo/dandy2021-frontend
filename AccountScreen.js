import React, { useState } from 'react';
import { Text, View, Button, Alert, TextInput} from 'react-native';
import { styles } from './styles';
import axios from 'axios';
import 'localstorage-polyfill'; 



export function AccountScreen() {
  return(
    
    <View style={styles.centerting}>
      <Text>Account Information!</Text>

      <Text> </Text>

      <Text style={styles.input}>Username:</Text>
      <Text style={styles.input}>Email:</Text>
      <Text style={styles.input}>Points: </Text>
      <Text style={styles.input}>Achievements: </Text>

    </View>   
    
    
  );
}
