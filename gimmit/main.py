import requests

url = "http://node-server:4000/"
try:
    response = requests.get(url)
    print("Response from Node.js server:", response.text)
except Exception as e:
    print("Failed to connect to Node.js server:", str(e))