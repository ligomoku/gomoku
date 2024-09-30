const msgpack = require("@msgpack/msgpack");

// Prepare data to send
const data = {
  user: "meg",
  message: "hello",
};

// Encode the data using MessagePack
const encoded = msgpack.encode(data);
console.log("Encoded MessagePack:", encoded);

// Decode the MessagePack data
const decoded = msgpack.decode(encoded);
console.log("Decoded Data:", decoded);
