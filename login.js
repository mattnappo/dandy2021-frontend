import React, { useState } from 'react';
import { Text, View, Button, Alert, TextInput} from 'react-native';
import { styles } from './styles';
import axios from 'axios';


export default class newUser extends React.Component {
  state = {
    name: '',
    email: '',
    username: '',
    password: '', 
    points: ''
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
    this.setState({ email: event.target.value });
    this.setState({ username: event.target.value });
    this.setState({ password: event.target.value });
    this.setState({ points: event.target.value });
  }

  handleSubmit = event => {

    const user = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      points: this.state.points
    };

    console.log(user);

    axios.post(`http://127.0.0.1:5000/insertUser/`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(err=>{console.log(err)})
    }
  }



export function sendPost(name, email, username, password, points) {
  const user = new newUser;
  user.state.name = name;
  user.state.email = email;
  user.state.username = username;
  user.state.password = password;
  user.state.points = points;

  console.log(user);

  user.handleSubmit();
}


export function PostScreen() {
  const [username, setText] = useState('');
  const [password, setText2] = useState('');
  const [name, setText3] = useState('');
  const [email, setText4] = useState('');


  return(
    
    <View style={styles.container}>
      <Text>Log Into Your Account!</Text>

      <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Name"
               placeholderTextColor = "#231F20"
               autoCapitalize = "none"
               
               onChangeText={name => setText3(name)}
               defaultValue={name}/>

      <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#231F20"
               autoCapitalize = "none"
               
               onChangeText={email => setText4(email)}
               defaultValue={email}/>

      

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

        onPress={() => sendPost(name, email, username, password, '0')} 
        title="Submit"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>   
    
    
  );
}
