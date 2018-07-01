import React from "react";

class Chat extends React.Component {
  state = {
    chat: ""
  };

  componentDidMount() {
    const $ = window.$;

    this.connection = $.hubConnection();
    const chatHubProxy = this.connection.createHubProxy("chatHub");

    chatHubProxy.on("broadcastMessage", message => {
      console.log("hi!");
      const messages = [...this.state.chat, message];
      this.setState({ chat: message });
    });

    chatHubProxy.connection.url = "/signalr";

    this.connection
      .start()
      .done(function() {
        console.log("Connected!");
      })
      .fail(function() {
        console.log("Could not Connect!");
      });
  }

  componentWillUnmount() {
    this.connection.stop();
  }

  render() {
    return (
      <div className="chatBox">
        {/* <pre>{JSON.stringify(this.state, null, 3)}</pre> */}
        <div className="chatHeader">Chats</div>
        <div className="chatBody">Messages</div>
        <div className="chatFooter">Send message</div>
      </div>
    );
  }
}

export default Chat;
