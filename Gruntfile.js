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
                    vocab_directory:  'test/fixtures/vocabs/',
                    output_directory: 'test/output/vocabs_to_sites/',
                },
                files: {
                    'index.html': ['test/fixtures/templates/index.html.tmpl']
                }
            },
            extra_data_to_sites: {
                options: {
                    vocabs:           ['english', 'mundo'],
                    vocab_directory:  'test/fixtures/vocabs',
                    output_directory: 'test/output/extra_data/',
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
                    vocab_directory:  'test/fixtures/vocabs/',
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
            },
            special_variables: {
                options: {
                    vocabs:           ['english'],
                    vocab_directory:  'test/fixtures/vocabs',
                    output_directory: 'test/output/special_variables'
                },
                files: {
                    'special_variables.html': 'test/fixtures/templates/special_variables.html.tmpl'
                }
            },
            sub_templates: {
                options: {
                    vocabs:             ['english'],
                    vocab_directory:    'test/fixtures/vocabs',
                    output_directory:   'test/output/sub_templates',
                    template_directory: 'test/fixtures/templates',
                    data: {
                        sub_template_title:    "Title from main template",
                        content:               "content from sub template",
                        sub_directory_content: "content from sub directory template"
                    }
                },
                files: {
                    'index.html': 'sub_templates.html.tmpl'
                }
            },
            sub_template_with_parameters: {
                options: {
                    vocabs:             ['english'],
                    vocab_directory:    'test/fixtures/vocabs',
                    output_directory:   'test/output/sub_template_with_parameters',
                    template_directory: 'test/fixtures/templates'
                },
                files: {
                    'index.html': 'sub_template_with_parameters.html.tmpl'
                }
            },
            nested_sub_templates: {
                options: {
                    vocabs:             ['english'],
                    vocab_directory:    'test/fixtures/vocabs',
                    output_directory:   'test/output/nested_sub_templates',
                    template_directory: 'test/fixtures/templates'
                },
                files: {
                    'index.html': 'nested_sub_template_1.html.tmpl'
                }
            },
            bb_code: {
                options: {
                    vocabs:           ['english'],
                    vocab_directory:  'test/fixtures/vocabs/',
                    output_directory: 'test/output/bb_code'
                },
                files: {
                    'bb_code_bold.html':      'test/fixtures/templates/bb_code_bold.html.tmpl',
                    'bb_code_paragraph.html': 'test/fixtures/templates/bb_code_paragraph.html.tmpl',
                    'bb_code_url.html':       'test/fixtures/templates/bb_code_url.html.tmpl',
                    'bb_code_mixed.html':     'test/fixtures/templates/bb_code_mixed.html.tmpl',
                }
            },
            render_all_vocabs: {
                options: {
                    vocabs:           ['*'],
                    vocab_directory:  'test/fixtures/vocabs/',
                    output_directory: 'test/output/render_all_vocabs'
                },
                files: {
                    'index.html': 'test/fixtures/templates/render_all_vocabs.html.tmpl'
                }
            },
            render_all_vocabs_alternative: {
                options: {
                    vocabs:           '*',
                    vocab_directory:  'test/fixtures/vocabs/',
                    output_directory: 'test/output/render_all_vocabs'
                },
                files: {
                    'index.html': 'test/fixtures/templates/render_all_vocabs.html.tmpl'
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        }
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