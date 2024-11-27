from flask import Flask, request, jsonify
import subprocess
import threading
import queue

app = Flask(__name__)

process = subprocess.Popen(
    ['./build/pbrain-rapfi', '--mode', 'gomocup'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True
)

command_queue = queue.Queue()
response_queue = queue.Queue()

def process_io():
    while True:
        try:
            command = command_queue.get(timeout=0.1)
            process.stdin.write(command + '\n')
            process.stdin.flush()
            response = process.stdout.readline().strip()
            response_queue.put(response)
        except queue.Empty:
            continue

io_thread = threading.Thread(target=process_io, daemon=True)
io_thread.start()

@app.route('/test')
def test():
    return jsonify({"status": "Engine is running"})

@app.route('/command', methods=['POST'])
def command():
    cmd = request.json.get('command')
    if not cmd:
        return jsonify({"error": "No command provided"}), 400

    command_queue.put(cmd)

    try:
        response = response_queue.get(timeout=5)
        return jsonify({"response": response})
    except queue.Empty:
        return jsonify({"error": "Timeout waiting for response"}), 408

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005)
