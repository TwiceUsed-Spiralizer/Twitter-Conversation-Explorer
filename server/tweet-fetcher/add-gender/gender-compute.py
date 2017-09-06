import sys, json

def do_the_thing():
  print(sys.argv[1][::-1])

if __name__ == '__main__':
  do_the_thing()
