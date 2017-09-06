import sys, os
from unidecode import unidecode
from pymongo import MongoClient
from genderComputer.genderComputer import GenderComputer

def gender_names():
  db = MongoClient(sys.argv[1]).tweets.tweets
  gc = GenderComputer(os.path.abspath('./genderComputer/nameLists'))
  for tweet in db.find({})[:100]:
    print(gc.resolveGender(tweet[u'sender'][u'name'], ''))

if __name__ == '__main__':
  gender_names()
