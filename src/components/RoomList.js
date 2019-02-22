import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
      super(props);

      this.state = {
        rooms: [],
        text: ''
      };

      this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = {key: snapshot.key, value: snapshot.val()};
        this.setState({rooms: this.state.rooms.concat(room) });
      });
    }

    createRoom() {
      var textInput = document.getElementById("newRoomName");
      var roomName = textInput.value;
      this.props.firebase.database().ref('rooms/4').set(roomName);
    }

    render() {
      return(
        <div>
            <h3>Room List</h3>
            {
                this.state.rooms.map(room => {
                    return <li key={room.key}>{room.value}</li>
                })
            }
            <form onSubmit={() => this.createRoom()}>
                Create New Room:<br />
                <input type="text" id="newRoomName"></input>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
      )

    }
  }

export default RoomList;
