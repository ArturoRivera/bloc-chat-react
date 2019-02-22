import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyABtw5rd9Kcgo_npSIkLcTn45SLPoRnMeQ",
    authDomain: "chat-react-80295.firebaseapp.com",
    databaseURL: "https://chat-react-80295.firebaseio.com",
    projectId: "chat-react-80295",
    storageBucket: "chat-react-80295.appspot.com",
    messagingSenderId: "925540749564"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super();

    this.firebase = firebase;
  }

  render() {
    return (
      <div className="App">
      <h1>Chat Rooms</h1>
        <RoomList firebase={this.firebase} />
      </div>
    );
  }
}

export default App;
