'''
  tweet-manager/add-gender/gender-compute.py

  Python script that updates tweets in MongoDB with gender for users
  based on their names.
  Spawned from tweet-manager/add-gender/index.js
'''
import sys, os
from unidecode import unidecode
from pymongo import MongoClient
# Import and initialise GenderComputer
from genderComputer.genderComputer import GenderComputer
gc = GenderComputer(os.path.join(os.path.dirname(__file__), './genderComputer/nameLists'))
# Open database
db = MongoClient(sys.argv[1]).tweets.tweets

def resolve_gender_from_user(user):
  # Defaults location to USA until we can sort better country parsing
  gender = gc.resolveGender(user[u'name'], 'USA')
  if gender == None or gender == 'unisex':
    gender = gc.resolveGender(user[u'screen_name'], 'USA')
  return gender

def gender_names(tweets):
  # Create bulk operation
  bulk = db.initialize_unordered_bulk_op()
  # Find unprocessed tweets and process
  for tweet in tweets:
    user_gender = resolve_gender_from_user(tweet[u'sender'])
    recipients = tweet[u'recipients']
    for recipient in recipients:
      recipient['gender'] = resolve_gender_from_user(recipient)
    bulk.find({ '_id': tweet[u'_id'] }).update({ '$set': { 'gender': True, 'sender.gender': user_gender, 'recipients': recipients } })
  # Write updates
  bulk.execute()

if __name__ == '__main__':
  # Basic event loop--blocks on input from stdin
  while True:
    if sys.stdin.readline() == 'end\n':
      break
    tweets = db.find({ 'gender': False, 'recipients_processed': True }).limit(200)
    while(tweets.count()):
      gender_names(tweets)
      tweets = db.find({ 'gender': False, 'recipients_processed': True }).limit(200)
