import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LandingPage from "./components/LandingPage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";

// require('dotenv').config()

const firebaseConfig = {
  apiKey: "AIzaSyBLCVKfDAhS_vWOGH4Xus6fccjOYRMu0Wg",
  authDomain: "ig-clone-2c831.firebaseapp.com",
  projectId: "ig-clone-2c831",
  storageBucket: "ig-clone-2c831.appspot.com",
  messagingSenderId: "462604496843",
  appId: "1:462604496843:web:4cd54cbcbbbe2840b0904e"
};

console.log('api key:' , firebaseConfig.apiKey)


if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}



const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

