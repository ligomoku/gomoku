import { checkSharedArrayBufferSupport } from "./util.js";

const STEngineURL = "/build/rapfi-single.js";
const MTEngineURL = "/build/rapfi-multi.js";
const supportSAB = checkSharedArrayBufferSupport();
var callback, worker;

function init(f) {
  callback = f;

  if (supportSAB) {
    console.log("Attempting to initialize multi-threaded engine...");
    import(/*@vite-ignore */ MTEngineURL)
      .then(() => {
        console.log("Multi-threaded engine imported.");
        if (Bridge.ready) {
          console.log("Bridge is ready.");
          callback({ ok: true });
        } else {
          Bridge.setReady = () => {
            console.log("Bridge is now ready.");
            callback({ ok: true });
          };
        }

        Bridge.readStdout = (d) => processOutput(d);
      })
      .catch((err) => {
        console.error("Error importing multi-threaded engine:", err);
        callback({ ok: false, error: err });
      });
  } else {
    console.log(
      "SharedArrayBuffer not supported. Falling back to single-threaded engine...",
    );
    worker = new Worker(STEngineURL, { type: "module" });

    worker.onmessage = function (e) {
      if (e.data.ready) {
        console.log("Worker is ready.");
        callback({ ok: true });
      } else {
        processOutput(e.data.output);
      }
    };

    worker.onerror = function (ev) {
      worker.terminate();
      console.error("Worker spawn error: " + ev.message + ". Retrying...");
      setTimeout(() => init(f), 200);
    };
  }
}

// Returns true if force stoped, otherwise returns false
function stopThinking() {
  if (!supportSAB) {
    console.warn("No support for SAB, failed to stop thinking.");

    worker.terminate();
    init(callback); // Use previous callback function

    return true;
  } else {
    sendCommand("YXSTOP");
    return false;
  }
}

function sendCommand(cmd) {
  if (typeof cmd !== "string" || cmd.length == 0) return;

  if (supportSAB) {
    // eslint-disable-next-line
    Bridge.writeStdin(cmd);
  } else {
    worker.postMessage(cmd);
  }
}

function processOutput(output) {
  if (typeof callback !== "function") return;

  let i = output.indexOf(" ");

  if (i == -1) {
    if (output == "OK") return;
    else if (output == "SWAP") callback({ swap: true });
    else {
      let coord = output.split(",");
      callback({ pos: [+coord[0], +coord[1]] });
    }
    return;
  }

  let head = output.substring(0, i);
  let tail = output.substring(i + 1);

  if (head == "MESSAGE") {
    if (tail.startsWith("REALTIME")) {
      let r = tail.split(" ");
      if (r.length < 3) {
        callback({
          realtime: {
            type: r[1],
          },
        });
      } else {
        let coord = r[2].split(",");
        callback({
          realtime: {
            type: r[1],
            pos: [+coord[0], +coord[1]],
          },
        });
      }
    } else {
      callback({ msg: tail });
    }
  } else if (head == "INFO") {
    i = tail.indexOf(" ");
    head = tail.substring(0, i);
    tail = tail.substring(i + 1);

    if (head == "PV") callback({ multipv: tail });
    else if (head == "NUMPV") callback({ numpv: +tail });
    else if (head == "DEPTH") callback({ depth: +tail });
    else if (head == "SELDEPTH") callback({ seldepth: +tail });
    else if (head == "NODES") callback({ nodes: +tail });
    else if (head == "TOTALNODES") callback({ totalnodes: +tail });
    else if (head == "TOTALTIME") callback({ totaltime: +tail });
    else if (head == "SPEED") callback({ speed: +tail });
    else if (head == "EVAL") callback({ eval: tail });
    else if (head == "WINRATE") callback({ winrate: parseFloat(tail) });
    else if (head == "BESTLINE")
      callback({
        bestline: tail.match(/([A-Z]\d+)/g).map((s) => {
          let coord = s.match(/([A-Z])(\d+)/);
          let x = coord[1].charCodeAt(0) - "A".charCodeAt(0);
          let y = +coord[2] - 1;
          return [x, y];
        }),
      });
  } else if (head == "ERROR") callback({ error: tail });
  else if (head == "FORBID")
    callback({
      forbid: (tail.match(/.{4}/g) || []).map((s) => {
        let coord = s.match(/([0-9][0-9])([0-9][0-9])/);
        let x = +coord[1];
        let y = +coord[2];
        return [x, y];
      }),
    });
  else callback({ unknown: tail });
}

export { init, sendCommand, stopThinking };
