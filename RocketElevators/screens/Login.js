import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, Button, Image } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin () {
    let item = {email, password}
    let result = await fetch('https://localhost:3306/employees?email=${email}&password=${password}', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "accept": 'application/json'
      },
      body: JSON.stringify(item),
    })
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image source={require('./../images/logo.png')}/>
      </View>
      <TextInput
        style={styles.innerContainer}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.innerContainer}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login"
       style={styles.submitButton}
       onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 200,
      //flex: 1,
     // backgroundColor: '#fff',
        alignItems: 'center',
      //justifyContent: 'center',
    },
    innerContainer:{
        padding: 10,
        borderWidth: 1,
        margin: 5,
        width: 150
    },
    imagecontainer:{
        alignItems: 'center'
    },
    submitButton:{
        width: 150
    },
  });

export default Login;
