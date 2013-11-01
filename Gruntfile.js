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
      tests: ['test/output'],
    },

    // Configuration to be run (and then tested).
    multi_lang_site_generator: {
      vocabs_to_sites: {
        options: {
          vocabs:           ['english', 'mundo'],
          vocab_directory:  'test/fixtures/vocabs',
          output_directory: 'test/output/vocabs_to_sites',
        },
        files: {
          'index.html': ['test/fixtures/templates/index.html.tmpl']
        }
      },
      extra_data_to_sites: {
        options: {
          vocabs:           ['english', 'mundo'],
          vocab_directory:  'test/fixtures/vocabs',
          output_directory: 'test/output/extra_data',
          data: {
            "foo": "bar"
          }
        },
        files: {
          'index.html': 'test/fixtures/templates/extra_data.html.tmpl'
        }
      },
      multiple_files: {
        options: {
          vocabs:           ['english'],
          vocab_directory:  'test/fixtures/vocabs',
          output_directory: 'test/output/multiple_files'
        },
        files: {
          'index.html': 'test/fixtures/templates/index.html.tmpl',
          'page.html':  'test/fixtures/templates/page.html.tmpl'
        }
      },
      template_directory_option: {
        options: {
          vocabs:             ['english'],
          vocab_directory:    'test/fixtures/vocabs',
          output_directory:   'test/output/template_directory_option',
          template_directory: 'test/fixtures/templates/'
        },
        files: {
          'index.html': 'index.html.tmpl'
        }
      }
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
  grunt.registerTask('test', ['clean', 'multi_lang_site_generator', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
