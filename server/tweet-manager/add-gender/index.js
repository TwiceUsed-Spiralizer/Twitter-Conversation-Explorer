/* eslint no-console: ["error", { "allow": ["error"] }] */
/*
 *  tweet-manager/add-gender/index.js
 *  Exports interface to Python process for adding gender
 *  to tweets. 
 */
require('dotenv').config();
const path = require('path');
const py = require('child_process').spawn('python', [path.join(__dirname, 'gender-compute.py'), process.env.MONGODB_URI]);

py.stderr.setEncoding('utf8');
py.stderr.on('data', data => !/narrow Python build/.test(data) && console.error(data));

module.exports = {
  compute: function genderCompute() {
    py.stdin.write('\n');
  },
  end: function endGenderCompute() {
    py.stdin.write('end\n');
  },
  kill: function killGenderCompute() {
    py.kill();
  },
};
