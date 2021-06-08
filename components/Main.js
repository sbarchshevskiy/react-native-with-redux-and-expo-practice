import React, { Component } from "react";
import {Text, View} from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import   fetchUser   from '../redux/actions/index'

import ArticlesView from './homeComponents/Articles'
import UserProfile from './homeComponents/UserProfile'


const NullComponent = () => {
  return null;
}

//https://reactnavigation.org/docs/bottom-tab-navigator/
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Articles from "./homeComponents/Articles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createBottomTabNavigator();

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return(
      <Tab.Navigator>
        <Tab.Screen name="Articles" component={ArticlesView}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={30}/>
          ),
        }}
        />
        <Tab.Screen name="UploadContainer" component={NullComponent}
                    listeners={({ nav }) => ({
                      onPress: event => {
                        event.preventDefault()
                        nav.navigate("UploadAnImage")
                      }
                    })}
                    options={{
                      tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons
                          name="plus-box"
                          color={color}
                          size={30}/>
                      ),
                    }}
        />
        <Tab.Screen name="Profile" component={UserProfile}
                    options={{
                      tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons
                          name="account-circle"
                          color={color}
                          size={30}/>
                      ),
                    }}
        />
      </Tab.Navigator>
      )
    }

}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Main);