import React, { Component } from 'react';
import { View, Button, TextInput } from "react-native-web";
import firebase from "firebase";

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',

    }

    this.onSignup = this.onSignup.bind(this);
  }

  onSignup(){
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('results', email, password)
      })
      .catch((err) => {
        console.log(`err ${err}`)
      })

  }

  render() {
    return(
      <View>
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />

        <Button
          onPress={() => this.onSignup()}
          title="Sign in"
        />
      </View>
    )
  }

}