const path = require('path');
const py = require('child_process').spawn('python', [path.join(__dirname, 'gender-compute.py')]);


py.stdin.write('yo');
py.stdin.end();

let str = '';
py.stdout.on('data', data => str += data);
py.stdout.on('end', () => console.log(str));
