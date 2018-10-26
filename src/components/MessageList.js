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

    render() {
        return (
            <div>
                <h2>Room: { this.props.activeRoom.name }</h2>
                <h3>Messages</h3>
                {this.state.messages
                    .map( message => {
                        return (
                            <div key={message.key}>
                                {message.content}
                            </div>
                        );
                    } 
                )}
            </div>
        )
    }
}

export default MessageList;