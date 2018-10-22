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

    handleSubmit = (e) => {
        e.preventDefault();
        this.roomsRef.push({
            name: e.target[0].value
        });
    }

    render() {
        return (
            <div>
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
                    <label htmlFor="addRoom">Enter new room name: </label>
                    <input id="addRoom" type="text" />
                    <input id="submit" type="submit" value="Add Room" />
                </form>
            </div>
        );
    }
}

export default RoomList;