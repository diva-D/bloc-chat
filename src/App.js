import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList';

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
  constructor(props) {
    super(props)

    this.state = {
      activeRoom: ''
    };

  }

  handleClick(key) {
    
    this.setState({
      activeRoom: key
    });

  }

  render() {
    return (
      <div>
        <RoomList 
          firebase={firebase} 
          activeRoom={this.state.activeRoom} 
          handleClick={(e) => this.handleClick(e)}
        />
        <MessageList 
          firebase={firebase} 
          activeRoom={this.state.activeRoom} 
        />
      </div>
    );
  }
}

export default App;
