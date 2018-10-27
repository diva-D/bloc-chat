import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };

        this.messagesRef = this.props.firebase.database().ref("messages");
    
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeRoom.key !== this.props.activeRoom.key) {
            this.setState({ messages: [] });

            this.messagesRef.orderByChild("roomID").equalTo(nextProps.activeRoom.key).on("child_added", (snapshot) => {
                const message = snapshot.val();
                message.key = snapshot.key;
                console.log(message.key);
                this.setState( prevState => {
                    return {
                        messages: prevState.messages.concat(message)
                    };  
                });
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        let userName;
        if (this.props.user) {
            userName = this.props.user.displayName;
        } else {
            userName = "Guest";
        }
        
        this.messagesRef.push({
            username: userName,
            content: e.target[0].value,
            roomID: this.props.activeRoom.key,
            sentAt: (new Date().getTime())
        });

        document.getElementById("message-send").reset();
    }

    render() {
        return (
            <div>
                <h2>Room: { this.props.activeRoom.name }</h2>
                <h3>Messages</h3>
                {this.state.messages
                    .map( message => {
                        return (
                            <div key={message.key}>
                                <div>
                                    {message.username}
                                </div>
                                <div>
                                    {message.content}
                                </div>
                                <div>
                                    {message.sentAt}
                                </div>
                            </div>
                        );
                    } 
                )}
                <form id="message-send" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Write your message here..." />
                    <input type="submit" value="Send"/>
                </form>
            </div>
        )
    }
}

export default MessageList;