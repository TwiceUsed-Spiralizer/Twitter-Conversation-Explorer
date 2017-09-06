module.exports = function gruntFile(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    run: {
      jest: {
        cmd: 'npm', // for client-side we use jest
        args: [
          'run',
          'testreact',
        ],
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['server/tests/tweet-fetcher/*.js'], // For server-side we use mocha/chai
      },
    },

    eslint: {
      target: [
        'src/*.js*',
      ],
    },
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('test', [
    'mochaTest', 'run',
  ]);

  grunt.registerTask('lint', [
    'eslint',
  ]);

  grunt.registerTask('travis', [
    'eslint', 'run', 'mochaTest',
  ]);
};
