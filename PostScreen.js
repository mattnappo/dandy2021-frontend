// import React from 'react';
// import { Text, View } from 'react-native';
// import { styles } from './styles';

// export function PostScreen() {
//   return(
//     <View style={styles.container}>
//       <Text>This is the post screen</Text>
//     </View>
//   );
// }

import React, { useState } from 'react';
import { Text, View, Button, Alert, TextInput} from 'react-native';
import { styles } from './styles';
import axios from 'axios';
import 'localstorage-polyfill'; 


const createTwoButtonAlert = (messageTitle, messageMessage) =>
Alert.alert(
  messageTitle,
  messageMessage,
  [
    {
      text: "Cancel",
      style: "cancel"
    },
  ]
);

export default class newUser extends React.Component {
  state = {
    username: '',
    password: '', 
  }

  handleChange = event => {
    this.setState({ username: event.target.value });
    this.setState({ password: event.target.value });
  }

  handleSubmit = event => {

    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    console.log(user);

    axios.post(`http://127.0.0.1:5000/login/`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(err=>{createTwoButtonAlert("Login Error", "There was an error logging you in. Please try again!"); localStorage.setItem("username", '')})
    }
  }



export function sendPost(username, password) {
  const user = new newUser;
  user.state.username = username;
  user.state.password = password;

  localStorage.setItem("username", username);
  user.handleSubmit();
}


export function PostScreen() {
  const [username, setText] = useState('');
  const [password, setText2] = useState('');


  return(
    
    <View style={styles.container}>
      <Text>Log Into Your Account!</Text>

      

      <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Username"
               placeholderTextColor = "#231F20"
               autoCapitalize = "none"
               
               onChangeText={username => setText(username)}
               defaultValue={username}/>
      
      <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#231F20"
               autoCapitalize = "none"
               secureTextEntry

               onChangeText={password => setText2(password)}
               defaultValue={password}
               />


      <Button
        style = {styles.buttonStyle}

        onPress={() => sendPost(username, password)} 
        title="Submit"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>   
    
    
  );
}
