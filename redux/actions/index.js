import firebase from "firebase";
import { USER_STATE_CHANGE } from "../constants";


export default function fetchUser() {
  return ((dispatch) => {
    firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((captureDb) => {
        if (captureDb.exists) {
          console.log('capture', captureDb.data())
          dispatch({
            type: USER_STATE_CHANGE,
            currentUser: captureDb.data()})
        } else {
          console.log('no user')
        }
      })
  })
}