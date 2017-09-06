import sys, os
from unidecode import unidecode
from pymongo import MongoClient
from genderComputer.genderComputer import GenderComputer
gc = GenderComputer(os.path.abspath('./genderComputer/nameLists'))

def resolve_gender_from_user(user):
  # Defaults location to USA until we can sort better country parsing
  gender = gc.resolveGender(user[u'name'], 'USA')
  if gender == None or gender == 'unisex':
    gender = gc.resolveGender(user[u'screen_name'], 'USA')
  return gender

def gender_names():
  # Open database and create bulk operation
  db = MongoClient(sys.argv[1]).tweets.tweets
  bulk = db.initialize_unordered_bulk_op()
  # Find unprocessed tweets and process
  for tweet in db.find({ 'gender': False, 'recipients_processed': True }).limit(200):
    user_gender = resolve_gender_from_user(tweet[u'sender'])
    recipients = tweet[u'recipients']
    for recipient in recipients:
      recipient['gender'] = resolve_gender_from_user(recipient)
    bulk.find({ '_id': tweet[u'_id'] }).update({ '$set': { 'gender': True, 'sender.gender': user_gender, 'recipients': recipients } })
  # Write updates
  bulk.execute()

if __name__ == '__main__':
  gender_names()
