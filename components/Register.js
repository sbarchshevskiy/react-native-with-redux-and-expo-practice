import React, { Component } from 'react';
import { View, Button, TextInput } from "react-native-web";
import firebase from "firebase";
import firestore from "firebase";

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: ''
    }

    this.onSignup = this.onSignup.bind(this);
  }

  onSignup(){
    const { email, password, name } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase.firestore().collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({name, email});
        console.log('registered')

      })
      .catch((err) => {
        console.log(`err ${err}`)
      })

  }

  render() {
    return(
      <View>
        <TextInput
            placeholder="name"
            onChangeText={(name) => this.setState({name})}
        />
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
          title="Sign up"
        />
      </View>
    )
  }

}