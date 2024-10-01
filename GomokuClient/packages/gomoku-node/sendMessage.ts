import * as signalR from "@microsoft/signalr";
import * as msgpack from "@msgpack/msgpack";

const data = {
  user: "meg",
  message: "hello gomoku",
};

const encoded = msgpack.encode(data);
console.log("Encoded MessagePack:", encoded);

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:62411/gamehub")
  .build();

async function startAndSendMessage() {
  try {
    await connection.start();
    console.log("SignalR connection established (Sender)");

    await connection.send("SendMessage", encoded);
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error starting connection or sending message:", error);
  }
}

startAndSendMessage();
