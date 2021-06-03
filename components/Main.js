import React, { Component } from "react";
import {Text, View} from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import  fetchUser  from '../redux/actions/index'

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const  { currentUser } = this.props;
    // console.log('current user', currentUser)

    if (currentUser === undefined){
      return(
        <View>Please Login</View>
      )
    }

    return(
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>
          { currentUser.name } is logged in
        </Text>
      </View>
    )
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Main);