import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
// import * as firebase from "firebase";
import { StyleSheet, Text, View } from 'react-native';
import LandingPage from "./components/LandingPage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./components/Register";
import Login from "./components/Login";
import MainPage, {Main} from './components/Main'
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

import MainScreen from './components/Main'
import UploadAnImage from './components/homeComponents/UploadAnImage';



const store = createStore(rootReducer, applyMiddleware(thunk));


// require('dotenv').config()

const firebase = require('firebase/app').default
//previously
// import * as firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyBLCVKfDAhS_vWOGH4Xus6fccjOYRMu0Wg",
  authDomain: "ig-clone-2c831.firebaseapp.com",
  projectId: "ig-clone-2c831",
  storageBucket: "ig-clone-2c831.appspot.com",
  messagingSenderId: "462604496843",
  appId: "1:462604496843:web:4cd54cbcbbbe2840b0904e"
};


if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();


export default class App extends Component{

  constructor(props) {
    super(props);

    this.state = {
      logged: false,
      loggedIn: false

    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user){
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })

  }

  render(){
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>
            rendering
          </Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LandingPage">
            <Stack.Screen
              name="LandingPage"
              component={LandingPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="UploadAnImage" component={UploadAnImage} />
          </Stack.Navigator>

        </NavigationContainer>



      </Provider>

    )
  }
}

