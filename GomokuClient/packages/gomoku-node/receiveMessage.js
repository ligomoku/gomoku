const signalR = require("@microsoft/signalr");

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:62411/gamehub")
  .build();

connection.on("ReceiveMessage", (user, message) => {
  console.log(`Received message from ${user}: ${message}`);
});

async function startConnection() {
  try {
    await connection.start();
    console.log("SignalR connection established (Receiver)");
  } catch (error) {
    console.error("Error starting connection:", error);
  }
}

startConnection();
