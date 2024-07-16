import { useState } from "react";
import axios from "axios";
import { socket } from "../socket";

/* eslint-disable react/prop-types */
const Username = ({ toggleUsernameSubmit, onSetToken }) => {
  const [username, setUsername] = useState("");

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();

    // Get the token and set the auth header
    const { data } = await axios.post(
      "http://WebSoc-ALBWe-hirjoGMoWK9V-571566059.us-east-1.elb.amazonaws.com/login",
      {
        username,
      }
    );
    // const { data } = await axios.post("/login", {
    //   username,
    // });
    socket.auth.token = data; // Set a `token` prop on the `auth` header used to make a connection to the signed token
    console.log("socket: ", socket);

    toggleUsernameSubmit(username);
  };

  return (
    <form className="userName" onSubmit={handleUsernameSubmit}>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Username;
