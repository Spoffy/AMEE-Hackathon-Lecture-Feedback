from bottle import Bottle, post, get, run, static_file, redirect, request
import json

STATIC_FILE_PREFIX='static'

app = Bottle()

@app.post('/post/login')
def login():
  print(request.json)
  return json.dumps(['Rabbit', 'Hedgehog', 'Banana', 'Tristan'])

@app.get('/')
def default_page():
  return redirect("/static/pages/index.html")

@app.get('/static/<path:path>')
def serve_static(path):
  return static_file(path, root=STATIC_FILE_PREFIX)

run(app, host='localhost', port=8080)
