from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/post_data', methods=['POST'])
def post_data():
    data = request.json
    print("Received data:")
    print(data)
    return jsonify({"message": "Data received successfully"})

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
