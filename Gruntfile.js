module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['test/**/*.js'], // For Scott's amendment
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

  grunt.registerTask('test', [
    'mochaTest',
  ]);

  grunt.registerTask('lint', [
    'eslint',
  ]);
};
