from bottle import Bottle, post, get, run, static_file, redirect, request, response
import base64
import hashlib
import json
import lecture

STATIC_FILE_PREFIX='static'

app = Bottle()

def create_hash(text):
  """
    Shennanigan based hashing.
    Mush it into an ascii string.
  """
  hash_obj = hashlib.sha512()
  hash_obj.update(text.encode("utf-8"))
  return base64.b64encode(hash_obj.digest()).decode("ascii")

def get_courses_for_user(user_id):
  return ["Sample Course 1", "Sample Course 2", "Sample Course 3"]

@app.post('/post/login')
def login():
  email = request.json.get("email", None);
  if not email: return json.dumps(["No email given."]);
  user_id = create_hash(email)
  print(email, " has logged in as ", user_id)
  response.set_cookie("user_id", user_id)
  return json.dumps(get_courses_for_user(user_id))

@app.post('/post/select')
def select():
  course = request.json["course"]
  user_id = request.cookies.user_id
  print("Adding ", user_id, " to ", course)
  lecture.add_to_session(course, user_id)

@app.post('/post/upvote')
def upvote():
  user_id = request.cookies.user_id
  print(user_id, " is upvoting their session")
  lecture.upvote(user_id)

@app.post('/post/downvote')
def downvote():
  user_id = request.cookies.user_id
  print(user_id, " is downvoting their session")
  lecture.downvote(user_id)

@app.get('/')
def default_page():
  return redirect("/static/pages/index.html")

@app.get('/static/<path:path>')
def serve_static(path):
  return static_file(path, root=STATIC_FILE_PREFIX)

run(app, host='localhost', port=8080)
