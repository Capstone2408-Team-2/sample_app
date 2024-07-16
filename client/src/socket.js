import { io } from "socket.io-client";

const URL = "https://ws.chat.averylittlemore.xyz/"; // subdomain CNAME that points to the ALB goes here

export const socket = io(URL, {
  autoConnect: false, // required for connection state recovery
  transports: ["websocket", "polling"], // attempt WebSocket connection first, fallback to polling
  reconnection: true, // Enable reconnection attempts
  reconnectionAttempts: 5, // Number of attempts before giving up
  reconnectionDelay: 5000, // Delay between reconnection
  reconnectionDelayMax: 5000, // Maximum delay between reconnection
  timeout: 20000, // Before a connection attempt is considered failed
});
