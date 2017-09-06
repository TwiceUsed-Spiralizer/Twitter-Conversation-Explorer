/* eslint no-console: ["error", { "allow": ["error"] }] */
require('dotenv').config();
const path = require('path');
const py = require('child_process').spawn('python', [path.join(__dirname, 'gender-compute.py'), process.env.MONGODB_URI]);

py.stderr.setEncoding('utf8');
py.stderr.on('data', console.error);

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
