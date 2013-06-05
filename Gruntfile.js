/*
 * grunt-template-runner
 * https://github.com/ErikLoubal/grunt-template-runner
 *
 * Copyright (c) 2013 Erik Loubal
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    template_runner: {
      bare_template: {
        options: {
          i18n: false,
          data: {name : 'content'}
        },
        files: {
          'tmp/default.txt': ['test/fixtures/default.txt'],
        },
      },
      basic_i18n: {
        options: {
          locales: ['en', 'fr'],
          directory: 'test/fixtures/locales'
        },
        files: {
          'tmp/basic.html': ['test/fixtures/basic.html'],
        },
      },
      no_extension: {
          options: {
            locales: ['en'],
            directory: 'test/fixtures/locales'
          },
          files: {
            'tmp/no_extension': ['test/fixtures/basic.html'],
          },
        },
      folder: {
        options: {
          locales: ['en', 'fr'],
          directory: 'test/fixtures/locales'
        },
        files: {
          'tmp/folder/': ['test/fixtures/folder/test1.html', 
                          'test/fixtures/folder/test2.hbs', 
                          'test/fixtures/folder/test3.md'],
        },
      },
      gettext: {
          options: {
            locales: ['en', 'fr'],
            directory: 'test/gettext',
            gettext: 'default',
            gettext_suffix: 'po'
          },
          files: {
            'tmp/fg/': ['test/fixtures/folder/test1.html', 
                        'test/fixtures/folder/test2.hbs', 
                        'test/fixtures/folder/test3.md'],
          },
        },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'template_runner', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
