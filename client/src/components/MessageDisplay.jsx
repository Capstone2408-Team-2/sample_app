/* eslint-disable react/prop-types */
import { useState } from "react";
import DisplayMessages from "./DisplayMessages";
import SendMessageForm from "./SendMessageForm";
import SendQueueForm from "./SendQueueForm";
import useChannel from "../customHooks/useChannel";
import ChangeUserName from "./ChangeUserName";
import OnlineUserPresence from "./OnlineUserPresence";
import usePresence from "../customHooks/usePresence";

const MessageDisplay = ({
  currentChannel,
  user,
  toggleLeaveChannel,
  toggleChangeUser,
}) => {
  const [messages, setMessages] = useState([]);
  const { presenceData, updatePresenceInfo } = usePresence(currentChannel, {
    user,
  });

  const handleMessage = (data) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      `${data.message} => ${data.sendDescription}`,
    ]);
  };

  const { publish, queue } = useChannel(
    currentChannel,
    setMessages,
    handleMessage
  );

  const handleLeaveChannel = (event) => {
    event.preventDefault();
    setMessages([]);
    toggleLeaveChannel();
  };

  const handleChangeUser = (newUserName) => {
    toggleChangeUser(newUserName);
    updatePresenceInfo({ user: newUserName });
  };

  return (
    <>
      <div className="message-display">
        <div>
          <div className="channel-info-container">
            <p className="channel-info">Current Channel: {currentChannel}</p>
            <form onSubmit={handleLeaveChannel}>
              <button type="submit">Leave</button>
            </form>
          </div>
          <></>
          <DisplayMessages messages={messages} />
          <SendMessageForm user={user} publish={publish} />
          <SendQueueForm user={user} queue={queue} />
          <ChangeUserName user={user} toggleChangeUser={handleChangeUser} />
        </div>
        <OnlineUserPresence presenceData={presenceData} />
      </div>
    </>
  );
};

export default MessageDisplay;
