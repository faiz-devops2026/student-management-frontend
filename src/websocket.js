import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (onMessage) => {
  const socket = new SockJS(
    "https://student-management-ye13.onrender.com/ws"
  );

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("✅ WebSocket connected");

      stompClient.subscribe("/topic/students", (msg) => {
        onMessage(msg.body);
      });
    },

    onStompError: (frame) => {
      console.error("❌ WebSocket error", frame);
    },
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};
