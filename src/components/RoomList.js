import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
      super(props);

      this.state = {
        rooms: []
      };

      this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = {key: snapshot.key, value: snapshot.val()};
        this.setState({rooms: this.state.rooms.concat(room) });
      });
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
        </div>
      )

    }
  }

export default RoomList;
