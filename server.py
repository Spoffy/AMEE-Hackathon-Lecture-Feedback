from bottle import Bottle, post, get, run, static_file, redirect, request, response
import base64
import hashlib
import json

STATIC_FILE_PREFIX='static'

app = Bottle()

def createHash(text):
  """
    Shennanigan based hashing.
    Mush it into an ascii string.
  """
  hashObj = hashlib.sha512()
  hashObj.update(text.encode("utf-8"))
  return base64.b64encode(hashObj.digest()).decode("ascii")

@app.post('/post/login')
def login():
  email = request.json.get("email", None);
  if not email: return json.dumps(["No email given."]);
  response.set_cookie("session_id", createHash(email))
  return json.dumps(['Rabbit', 'Hedgehog', 'Banana', 'Tristan'])

@app.get('/')
def default_page():
  return redirect("/static/pages/index.html")

@app.get('/static/<path:path>')
def serve_static(path):
  return static_file(path, root=STATIC_FILE_PREFIX)

run(app, host='localhost', port=8080)
