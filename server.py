from bottle import Bottle, post, get, run, static_file, redirect, request, response
import base64
import hashlib
import json
import lecture
from time import time

STATIC_FILE_PREFIX='static'
COURSES = [
  "Sample Course 1",
  "Sample Course 2",
  "Sample Course 3",
  "Sample Course 4"
]

app = Bottle()

def create_hash(text):
  """
    Shennanigan based hashing.
    Mush it into an ascii string.
  """
  hash_obj = hashlib.sha512()
  hash_obj.update(text.encode("utf-8"))
  return base64.b64encode(hash_obj.digest()).decode("ascii")

SPEAKERS = [
  create_hash("letsdothis@alejandro.hack")
]

def create_course(name, in_progress=False):
  return {"name": name, "in_progress": in_progress}

def get_courses_for_user(user_id):
  return [
    create_course(COURSES[0]),
    create_course(COURSES[1]),
    create_course(COURSES[2], True),
    create_course(COURSES[3])
  ]

@app.post('/post/login')
def login():
  email = request.json.get("email", None);
  if not email: return json.dumps(["No email given."]);
  user_id = create_hash(email)
  print(email, " has logged in as ", user_id)
  response.set_cookie("user_id", user_id)

@app.post('/post/courses')
def course_list():
  user_id = request.cookies.user_id
  return json.dumps(get_courses_for_user(user_id))

@app.post('/post/select')
def select():
  course = request.json["course"]
  user_id = request.cookies.user_id
  print("Adding ", user_id, " to ", course)
  lecture.add_to_session(course, user_id)
  return json.dumps({"show_analytics": (user_id in SPEAKERS)})

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

@app.post('/post/analytics')
def analytics():
  user_id = request.cookies.user_id
  if not user_id in SPEAKERS: return;
  return json.dumps({
    "period_understanding": lecture.period_understanding(user_id),
    "upvotes_last_period": lecture.value_last_period(user_id, 1),
    "downvotes_last_period":lecture.value_last_period(user_id, -1),
    "passed_warning_threshold": 
      lecture.has_passed_warning_threshold(user_id),
    "vote_lifetime": lecture.VOTE_LIFETIME
  });

@app.post('/post/comment')
def add_comment():
  user_id = request.cookies.user_id
  lecture.add_comment(user_id, request.json['comment'])

def new_comment(q):
  return {
    "question": q,
    "time": time()
  }

test_comments = [
  new_comment("Hello"),
  new_comment("I"),
  new_comment("Am a total"),
  new_comment("Rabbit")
]

@app.post('/post/comments')
def post_comments():
  user_id = request.cookies.user_id
  if not user_id in SPEAKERS: return;
  #return json.dumps(lecture.get_comments(user_id))
  return json.dumps(test_comments)

@app.get('/')
def default_page():
  return redirect("/static/pages/index.html")

@app.get('/static/<path:path>')
def serve_static(path):
  return static_file(path, root=STATIC_FILE_PREFIX)

run(app, host='localhost', port=8080, quiet=False)
