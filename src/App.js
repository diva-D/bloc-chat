import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'

var config = {
  apiKey: "AIzaSyDA_UkNP5f9E8758IAhznad9rO5L5oInxI",
  authDomain: "bloc-chat-8796b.firebaseapp.com",
  databaseURL: "https://bloc-chat-8796b.firebaseio.com",
  projectId: "bloc-chat-8796b",
  storageBucket: "bloc-chat-8796b.appspot.com",
  messagingSenderId: "631782518901"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <RoomList firebase={firebase} />
    );
  }
}

export default App;
