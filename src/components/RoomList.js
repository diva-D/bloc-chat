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

    handleSubmitAdd = (e) => {
        e.preventDefault();
        this.roomsRef.push({
            name: e.target[0].value
        });
    }

    handleSubmitDelete = (e) => {
        e.preventDefault();
        // https://stackoverflow.com/questions/35929901/firebase-remove-something-by-value
        let room_name = e.target[0].value
        this.roomsRef.orderByChild('name').equalTo(room_name).on('child_added', (snapshot) => {
            snapshot.ref.remove()
        });
        // https://stackoverflow.com/questions/36326612/delete-item-from-state-array-in-react
        let array = [...this.state.rooms];
        let index = array.indexOf(e.target[0].value);
        array.splice(index, 1);
        this.setState({ rooms: array});
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.rooms.map( room => {
                        return (
                            <li key={room.key} onClick={() => this.props.handleClick(room)}>
                                {room.name}
                            </li>
                        );
                    } )}
                </ul>
                <form onSubmit={this.handleSubmitAdd}>
                    <label htmlFor="addRoom">Enter new room name: </label>
                    <input id="addRoom" type="text" />
                    <input id="submit" type="submit" value="Add Room" />
                </form>
                
                <form onSubmit={this.handleSubmitDelete}>
                    <label htmlFor="deleteRoom">Delete room: </label>
                    <select id="roomList">
                        {this.state.rooms.map( room => {
                        return (
                            <option key={room.key} value={room.name}>
                                {room.name}
                            </option>
                        );
                    } )}
                    </select>
                    <input id="deleteSubmit" type="submit" value="Delete Room" />
                </form>
            </div>
        );
    }
}

export default RoomList;