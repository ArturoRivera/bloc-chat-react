import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
      super(props);

      this.state = {
        rooms: [],
        roomName: ""
      };

      this.roomsRef = this.props.firebase.database().ref('rooms');
      this.createRoom = this.createRoom.bind(this);
      this.handleNewInput = this.handleNewInput.bind(this);
      this.setActiveRoom = this.props.setActiveRoom.bind(this);
    }

    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
            this.setState({
              rooms: this.state.rooms.concat(room)
            });
      });

      this.setState({
        roomName: ""
      });
    }


    handleNewInput(e) {
      e.preventDefault();
      this.setState({
        roomName: e.target.value
      });
    }


    createRoom(e) {
      e.preventDefault();

      this.roomsRef.push({
        roomName: this.state.roomName
      });

      this.setState({roomName: ""});
    }


    selectRoom (room) {
      this.props.setActiveRoom(room);
    }


    render() {
        let roomList = this.state.rooms.map((room) =>
            <p key={room.key} onClick={ (e) => this.selectRoom(room, e) }>{room.roomName}</p>
        );

        let roomForm = (
            <form onSubmit={this.createRoom}>
              <input type="text" value={this.state.roomName} placeholder="Enter Room Name..." onChange={this.handleNewInput} />
              <input type="submit" value="Add New Room"/>
            </form>
        )

      return(
        <div>
            <h3>{this.props.activeRoom ? this.props.activeRoom.roomName : "Select a Chat Room"}</h3>
            <ul>{roomList}</ul>
            <ul>{roomForm}</ul>
        </div>
      )

    }
  }

export default RoomList;
