
import React, { useState } from 'react';
import { Text, View, Button, Alert, TextInput} from 'react-native';
import { styles } from './styles';
import axios from 'axios';



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
  }

  handleChange = event => {
    this.setState({ username: event.target.value });
  }

  handleSubmit = event => {

    const user = {
      value: this.state.username,
      criteria: 'username',
      table: 'Users'
    };

    console.log(user);

    axios.post(`http://127.0.0.1:5000/readOne/`, { user})
      .then(res => {
        console.log(res);
        console.log(res.data);
    }).catch(err=>{createTwoButtonAlert("Account Error", "There was an error retrieving your account information. Please try again!")})}
  }



export function sendPost(username) {
  const user = new newUser;
  user.state.username = username;
  user.handleSubmit();
}


export function PostScreen() {
  const [username, setText] = localStorage.getItem('username');


  return(
    
    <View style={styles.container}>
      <Text>Account Info</Text>
    </View>   
    
    // Make post request to server and display data
  );
}
