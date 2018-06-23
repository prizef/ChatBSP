import React from "react";

class Chat extends React.Component {
  render() {
    return (
    <div className="chatBox">
        <div className="chatHeader">
            Chats
        </div>
        <div className="chatBody">
            Messages
        </div>
        <div className="chatFooter">
            Send message
        </div>
    </div>
    );
  }
}

export default Chat;
