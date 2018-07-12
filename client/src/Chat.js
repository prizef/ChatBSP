import React from "react";
import "./Chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      this.setState({ chat: messages });
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
        <pre>{JSON.stringify(this.state, null, 3)}</pre>

        <div className="main-section">
          <div className="head-section">
            <div className="headLeft-section">
              <div className="headLeft-sub">
                <input type="text" name="search" placeholder="Search..." />
                <button>
                  {" "}
                  <FontAwesomeIcon icon="search" className="i" />{" "}
                </button>
              </div>
            </div>
            <div className="headRight-section">
              <div className="headRight-sub">
                <h3>prize</h3>
                <small>Coding away...</small>
              </div>
            </div>
          </div>
          <div className="body-section">
            <div
              className="left-section mCustomScrollbar"
              data-mcs-theme="minimal-dark"
            >
              <ul>
                <li>
                  <div className="chatList">
                    <div className="img">
                      <FontAwesomeIcon icon="circle" className="i" />
                      <img
                        src="https://lh4.googleusercontent.com/--nIKkl5_l-k/AAAAAAAAAAI/AAAAAAAAAHQ/hG0fFDtkAHs/s96-c/photo.jpg"
                        alt="user avatar"
                      />
                    </div>
                    <div className="desc">
                      <small className="time">05:30 am</small>
                      <h5>prize</h5>
                      <small>Hey man, what's going...</small>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="right-section">
              <div
                className="message mCustomScrollbar"
                data-mcs-theme="minimal-dark"
              >
                <ul>
                  <li className="msg-left">
                    <div className="msg-left-sub">
                      <img
                        src="https://lh4.googleusercontent.com/--nIKkl5_l-k/AAAAAAAAAAI/AAAAAAAAAHQ/hG0fFDtkAHs/s96-c/photo.jpg"
                        alt="user avatar"
                      />
                      <div className="msg-desc">
                        Hey man, what's going on?
                      </div>
                      <small>05:25 am</small>
                    </div>
                  </li>
                  <li className="msg-right">
                    <div className="msg-left-sub">
                      <img
                        src="https://lh4.googleusercontent.com/--nIKkl5_l-k/AAAAAAAAAAI/AAAAAAAAAHQ/hG0fFDtkAHs/s96-c/photo.jpg"
                        alt="user avatar"
                      />
                      <div className="msg-desc">
                        Not much over here.
                      </div>
                      <small>05:25 am</small>
                    </div>
                  </li>
                  <li className="msg-day">
                    <small>Wednesday</small>
                  </li>
                </ul>
              </div>
              <div className="right-section-bottom">
                <form>
                  <div className="upload-btn">
                    <button className="btn">
                      <FontAwesomeIcon icon="image" className="i" />
                    </button>
                    <input type="file" name="myfile" />
                  </div>
                  <input type="text" name="" placeholder="type here..." />
                  <button className="btn-send">
                    <FontAwesomeIcon icon="paper-plane" className="i" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
