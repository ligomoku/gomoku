const signalR = require("@microsoft/signalr");
const msgpack = require("@msgpack/msgpack");

const data = {
  user: "meg",
  message: "hello gomoku",
};

const encoded = msgpack.encode(data);
console.log("Encoded MessagePack:", encoded);

const connection = new signalR.HubConnectionBuilder()
  //TODO: connect to node .env file
  .withUrl("http://localhost:62411/gamehub")
  .build();

async function startAndSendMessage() {
  try {
    await connection.start();
    console.log("SignalR connection established");

    await connection.send("SendMessage", encoded);
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error starting connection or sending message:", error);
  }
}

startAndSendMessage();

const decoded = msgpack.decode(encoded);
console.log("Decoded Data:", decoded);
