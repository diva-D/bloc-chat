import React, { Component } from 'react';

class User extends Component {
    
    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            this.props.setUser(user);
        });
    }
    
    signIn = () => {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider);
    };

    signOut = () => {
       this.props.firebase.auth().signOut();
    };

    render() {
        let userName;
        if (this.props.user) {
            userName = this.props.user.displayName;
        } else {
            userName = "Guest";
        }
        
        return (
            <div>
                <p>User: {userName}</p>
                <button onClick={this.signIn}>Log In</button>
                <button onClick={this.signOut}>Log Out</button>
            </div>
        );
    }
}

export default User;