import { useState, useEffect } from "react";
// import { cerebellum } from "./socket";
import "./App.css";
import Username from "./components/Username";
import Channel from "./components/Channel";
import MessageDisplay from "./components/MessageDisplay";
import cerebellumLogo from "./assets/Cerebellum-transparent.png";
import { useCerebellum } from "@cerebellum/sdk";

const App = () => {
  const cerebellum = useCerebellum();
  const [user, setUser] = useState(null);
  const [currentChannel, setCurrentChannel] = useState(null);

  useEffect(() => {
    if (user) {
      cerebellum.authErrorCallback(() => setUser(null));
      cerebellum.connect();
      cerebellum.on("recovery:enable", () => {
        console.log("recovery has been enabled");
      });

      cerebellum.on("disconnect", (reason) => {
        console.log(`Disconnected: ${reason}`);
      });
    }

    return () => {
      cerebellum.off("disconnect");
      cerebellum.off("recovery:enabled");
    };
  }, [user, cerebellum]);

  const handleUsernameSubmit = (username) => {
    setUser(username);
  };

  const handleLeaveChannel = () => {
    if (currentChannel) {
      setCurrentChannel(null);
    }
  };

  const handleJoinChannel = (channelName) => {
    setCurrentChannel(channelName);
  };

  const handleChangeUser = (newUserName) => {
    setUser(newUserName);
  };

  return (
    <>
      <header className="header">
        <section className="top-bar">
          <div className="logo-container">
            <img src={cerebellumLogo} alt="Cerebellum Logo" className="logo" />
            <h1 className="logo-text">Cerebellum</h1>
          </div>
        </section>
      </header>
      <div className="container-wrapper">
        <div className="container">
          {!user ? (
            <Username toggleUsernameSubmit={handleUsernameSubmit} />
          ) : (
            <>
              <p className="welcome">Welcome, {user}!</p>
              {!currentChannel ? (
                <Channel
                  toggleJoinChannel={handleJoinChannel}
                  toggleLeaveChannel={handleLeaveChannel}
                  currentChannel={currentChannel}
                />
              ) : (
                <MessageDisplay
                  currentChannel={currentChannel}
                  user={user}
                  toggleLeaveChannel={handleLeaveChannel}
                  toggleChangeUser={handleChangeUser}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
