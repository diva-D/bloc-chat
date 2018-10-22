import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };

        this.roomsRef = this.props.firebase.database().ref("rooms");
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });
    }

    handleSubmit(e) {
        this.roomsRef.push({
            name: e
        });
    }

    render() {
        return (
            <ul>
                {this.state.rooms.map( room => {
                    return (
                        <li key={room.key}>
                            {room.name}
                        </li>
                    );
                } )}
            </ul>
            <form onSubmit={this.handleSubmit}>
                <lable for="addRoom">Enter new room name: </lable>
                <input id="addRoom" type="text" />
                <input id="submit" type="submit" value="Add Room" />
            </form>
        );
    }
}

export default RoomList;