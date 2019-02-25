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

    createRoom(e) {
      e.preventDefault();

      var textInput = document.getElementById("newRoomName");
      var roomName = textInput.value;

      this.roomsRef.push({
        roomName
      });
    }

    render() {
      return(
        <div>
            <h3>Room List</h3>
            {
                this.state.rooms.map(room => {
                    return <li key={room.key}>{room.value.roomName}</li>
                })
            }
            <form onSubmit={(e) => this.createRoom(e)}>
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
