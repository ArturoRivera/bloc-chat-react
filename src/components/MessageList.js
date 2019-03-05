import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
      constructor(props) {
        super(props);

        this.state = {
          messages: [],
          content: "",
          sentAt: "",
          roomKey: ""
        };

        this.messagesRef = this.props.firebase.database().ref("messages");
        this.createMessage = this.createMessage.bind(this);
        this.handleNewInput = this.handleNewInput.bind(this);

      }


      componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({
                  messages: this.state.messages.concat(message)
            });
            //debugger
        });
      }


      createMessage(e) {
        e.preventDefault(e);
        if(this.props.activeRoom){
            const username = this.props.user ? this.props.user.displayName : "Guest"
            const timestamp = firebase.database.ServerValue.TIMESTAMP;
            //debugger
            this.messagesRef.push({
                 content: this.state.content,
                 sentAt: timestamp,
                 roomKey: this.props.activeRoom.key,
                 username: username
            });
            this.setState ({
                content: "",
                sentAt: timestamp
            });
         }
      }


      handleNewInput(e) {
          e.preventDefault();
          this.setState({
            content: e.target.value,
          })
      }


      render() {
          let currentMessages = (
            this.state.messages.filter(message => message.roomKey === this.props.activeRoom.key).map((message, index) => {
                  return (
                    <p key={message.key}>User: {message.username} | {message.content}</p>
                  )
            })
          );

          let messageInput = (
            <div>
                <ul>
                  <form className="newMessage" onSubmit={this.createMessage}>
                    <h4>New Message</h4>
                    <input type='text' placeholder="Type message here" value={this.state.content} onChange={this.handleNewInput}/>
                    <button onClick={this.createMessage}>Send</button>
                  </form>
                </ul>
            </div>
          );

          return(
            <div id="messages">
                <div>
                {messageInput}
                </div>

                <div id="currentMessages">
                    {currentMessages}
                </div>
            </div>
          )
      }
}

export default MessageList;
