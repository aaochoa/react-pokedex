import * as firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDWt4NkWIlJPSe3bNRMm-kSVB1NSzI4sTw",
  authDomain: "react-pokedex-23ad6.firebaseapp.com",
  databaseURL: "https://react-pokedex-23ad6.firebaseio.com",
  projectId: "react-pokedex-23ad6",
  storageBucket: "react-pokedex-23ad6.appspot.com",
  messagingSenderId: "247183693401",
  appId: "1:247183693401:web:3b5e0aeb3797654d730348",
  measurementId: "G-RFE7WGW008"
})

export default app