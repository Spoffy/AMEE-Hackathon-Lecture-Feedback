from time import time
from functools import reduce

WARNING_PERIOD = 2
WARNING_PERCENT_THRESHOLD = 0.1
SESSION_DEATH_DELAY = 60 * 60 #1hr

_course_sessions = dict()
_user_sessions = dict()

def _sum_votes_iter(iterable):
    def sumFunc(total, voteEntry):
      (_, _, vote) = voteEntry
      return total + vote
    return reduce(sumFunc, iterable, 0)

class SessionTimeoutError(Exception):
  None

class Session:
  def __init__(self):
    self.participants = set()
    self.last_vote = dict()
    self.votes = list()
    self.votes_in_period = list()
    self.start_time = time()

  def add_user(self, user_id):
    self.participants.add(user_id)

  def is_active(self):
    timeSinceLastActivity = None
    try:
      (timeSinceLastActivity, _, _) = self.votes[-1]
    except IndexError:
      timeSinceLastActivity = self.start_time;
    if timeSinceLastActivity < time() - SESSION_DEATH_DELAY:
      return False
    return True

  def trim_period(self):
    threshold_time = time() - WARNING_PERIOD
    count = 0
    for (timestamp, _, _) in self.votes_in_period:
      print("Stamp", timestamp)
      print("Thresh", threshold_time)
      if timestamp > threshold_time:
        self.votes_in_period = self.votes_in_period[count:]
        return
      count += 1
    self.votes_in_period = list()

  def check_for_events(self):
    if (len(self.votes_in_period) > 
       (len(self.participants) * WARNING_PERCENT_THRESHOLD)):
      #warn()
      None

  def vote(self, user_id, value):
    voteEntry = (time(), user_id, value)
    self.votes.append(voteEntry)
    self.votes_in_period.append(voteEntry)
    self.last_vote[user_id] = time()
    self.trim_period()
    self.check_for_events()

    print("Votes: ", self.votes)
    print("VL: ", len(self.votes))
    print("VIP: ", len(self.votes_in_period))

  def upvote(self, user_id):
    self.vote(user_id, 1)

  def downvote(self, user_id):
    self.vote(user_id, -1)

  def avg_understanding(self):
    if not len(self.votes): return 0
    print("Made it past self.votes!")
    #Magic numbers map from range -1 to 1 to 0 to 1 (a.k.a a percentage)
    return ((_sum_votes_iter(self.votes)/len(self.votes)) + 1)/2

  def value_last_period(self, value):
    return len([x for x in self.votes_in_period if x[2] == value])
      

def init_course_session(course):
  session = None
  try:
    session = _course_sessions[course]
    if not session.is_active():
      raise SessionTimeoutError
  except (KeyError, SessionTimeoutError):
    session = _course_sessions[course] = Session()
  return session
    

def add_to_session(course, user_id):
  session = init_course_session(course)
  session.add_user(user_id)
  _user_sessions[user_id] = session

def upvote(user_id):
  session = _user_sessions[user_id]
  session.upvote(user_id)

def downvote(user_id):
  session = _user_sessions[user_id]
  session.downvote(user_id)

def avg_understanding(user_id):
  session = _user_sessions[user_id]
  return session.avg_understanding();

def value_last_period(user_id, value):
  session = _user_sessions[user_id]
  return session.value_last_period(value)

def test():
  add_to_session("Course", "John")
  add_to_session("Course", "James")
  add_to_session("Course", "Jane")
  upvote("John")
  upvote("James")
  upvote("Jane")
  downvote("Jane")
  session = _course_sessions["Course"]
  print(session.is_active())
  print(session.trim_period())
  print(session.check_for_events())

