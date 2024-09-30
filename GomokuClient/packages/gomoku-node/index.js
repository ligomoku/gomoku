const msgpack = require("@msgpack/msgpack");

const data = {
  user: "meg",
  message: "hello",
};

const encoded = msgpack.encode(data);
console.log("Encoded MessagePack:", encoded);

const decoded = msgpack.decode(encoded);
console.log("Decoded Data:", decoded);
