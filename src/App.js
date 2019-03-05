import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

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
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: "",
      user: null
    }
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
    this.firebase = firebase;
  }

  setActiveRoom(room) {
      this.setState({activeRoom: room});
  }

  setUser(user) {
      this.setState({user: user});
  }

  render() {
//debugger
    return (

      <div className="App">
          <h1>Chat Rooms</h1>
            <User
            firebase={this.firebase}
            setUser={this.setUser}
            user={this.state.user}
            />

            <RoomList
            firebase={this.firebase}
            activeRoom={this.state.activeRoom}
            setActiveRoom={this.setActiveRoom}
            />

            <MessageList
            firebase={this.firebase}
            activeRoom={this.state.activeRoom}
            user={this.state.user}
            />
      </div>

    );
  }
}

export default App;
