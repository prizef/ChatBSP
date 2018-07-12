import React from "react";
import "./Chat.css";

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
        {/* <pre>{JSON.stringify(this.state, null, 3)}</pre>*/}

        <div class="main-section">
          <div class="head-section">
            <div class="headLeft-section">
              <div class="headLeft-sub">
                <input type="text" name="search" placeholder="Search..." />
                <button>
                  {" "}
                  <i class="fa fa-search" />{" "}
                </button>
              </div>
            </div>
            <div class="headRight-section">
              <div class="headRight-sub">
                <h3>prize</h3>
                <small>Lorem ipsum dolor sit amet...</small>
              </div>
            </div>
          </div>
          <div class="body-section">
            <div
              class="left-section mCustomScrollbar"
              data-mcs-theme="minimal-dark"
            >
              <ul>
                <li>
                  <div class="chatList">
                    <div class="img">
                      <i class="fa fa-circle" />
                      <img src="/demo/man01.png" />
                    </div>
                    <div class="desc">
                      <small class="time">05:30 am</small>
                      <h5>prize</h5>
                      <small>Lorem ipsum dolor sit amet...</small>
                    </div>
                  </div>
                </li>
              </ul>

            </div>
            <div class="right-section">
              <div
                class="message mCustomScrollbar"
                data-mcs-theme="minimal-dark"
              >
                <ul>
                  <li class="msg-left">
                    <div class="msg-left-sub">
                      <img src="/demo/man03.png" />
                      <div class="msg-desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </div>
                      <small>05:25 am</small>
                    </div>
                  </li>
                  <li class="msg-right">
                    <div class="msg-left-sub">
                      <img src="/demo/man04.png" />
                      <div class="msg-desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </div>
                      <small>05:25 am</small>
                    </div>
                  </li>
                  <li class="msg-day">
                    <small>Wednesday</small>
                  </li>
                </ul>

              </div>
              <div class="right-section-bottom">
                <form>
                  <div class="upload-btn">
                    <button class="btn">
                      <i class="fa fa-photo" />
                    </button>
                    <input type="file" name="myfile" />
                  </div>
                  <input type="text" name="" placeholder="type here..." />
                  <button class="btn-send">
                    <i class="fa fa-send" />
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
