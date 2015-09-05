from bottle import Bottle, route, run, static_file, redirect

STATIC_FILE_PREFIX='static'

app = Bottle()

@app.route('/')
def default_page():
  return redirect("/static/pages/index.html")

@app.route('/static/<path:path>')
def serve_static(path):
  return static_file(path, root=STATIC_FILE_PREFIX)

run(app, host='localhost', port=8080)
