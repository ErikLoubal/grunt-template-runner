'use strict';

var grunt = require('grunt');

/*
    ======== A Handy Little Nodeunit Reference ========
    https://github.com/caolan/nodeunit

    Test methods:
        test.expect(numAssertions)
        test.done()
    Test assertions:
        test.ok(value, [message])
        test.equal(actual, expected, [message])
        test.notEqual(actual, expected, [message])
        test.deepEqual(actual, expected, [message])
        test.notDeepEqual(actual, expected, [message])
        test.strictEqual(actual, expected, [message])
        test.notStrictEqual(actual, expected, [message])
        test.throws(block, [error], [message])
        test.doesNotThrow(block, [error], [message])
        test.ifError(value)
*/

exports.template_runner = {
    setUp: function (done) {
        done();
    },
    vocabs_to_sites: function (test) {
        test.expect(2);

        var actual, expected;

        actual   = grunt.file.read('test/output/vocabs_to_sites/english/index.html');
        expected = grunt.file.read('test/expected/vocabs_to_sites/english/index.html');
        test.equal(actual, expected, 'should create an english version of the site');
        
        actual   = grunt.file.read('test/output/vocabs_to_sites/mundo/index.html');
        expected = grunt.file.read('test/expected/vocabs_to_sites/mundo/index.html');
        test.equal(actual, expected, 'should create a mundo version of the site');

        test.done();
    },
    extra_data: function (test) {
        test.expect(2);

        var actual, expected;

        actual   = grunt.file.read('test/output/extra_data/english/index.html');
        expected = grunt.file.read('test/expected/extra_data/english/index.html');
        test.equal(actual, expected, 'should create an english version of the site with extra data from the grunt file');
        
        actual   = grunt.file.read('test/output/extra_data/mundo/index.html');
        expected = grunt.file.read('test/expected/extra_data/mundo/index.html');
        test.equal(actual, expected, 'should create a mundo version of the site with extra data from the grunt file');

        test.done();
    },
    multiple_files: function (test) {
        test.expect(2);

        var actual, expected;

        actual   = grunt.file.read('test/output/multiple_files/english/index.html');
        expected = grunt.file.read('test/expected/multiple_files/english/index.html');
        test.equal(actual, expected, 'should create an index file');
        
        actual   = grunt.file.read('test/output/multiple_files/english/page.html');
        expected = grunt.file.read('test/expected/multiple_files/english/page.html');
        test.equal(actual, expected, 'should create a page file');

        test.done();
    },
    template_directory_option: function (test) {
        test.expect(1);

        var actual   = grunt.file.read('test/output/template_directory_option/english/index.html');
        var expected = grunt.file.read('test/expected/template_directory_option/english/index.html');
        test.equal(actual, expected, 'should create an index file');

        test.done();
    },
    special_variables: function (test) {
        test.expect(1);

        var actual   = grunt.file.read('test/output/special_variables/english/special_variables.html');
        var expected = grunt.file.read('test/expected/special_variables/english/special_variables.html');
        test.equal(actual, expected, 'should create an index file');

        test.done();
    },
    sub_templates: function (test) {
        test.expect(1);

        var actual   = grunt.file.read('test/output/sub_templates/english/index.html');
        var expected = grunt.file.read('test/expected/sub_templates/english/index.html');
        test.equal(actual, expected, 'should include sub templates and render content');

        test.done();
    },
    sub_template_with_parameters: function (test) {
        test.expect(1);

        var actual   = grunt.file.read('test/output/sub_template_with_parameters/english/index.html');
        var expected = grunt.file.read('test/expected/sub_template_with_parameters/english/index.html');
        test.equal(actual, expected, 'should include sub template with parameters and render content');

        test.done();
    },
    nested_sub_templates: function (test) {
        test.expect(1);

        var actual   = grunt.file.read('test/output/nested_sub_templates/english/index.html');
        var expected = grunt.file.read('test/expected/nested_sub_templates/english/index.html');
        test.equal(actual, expected, 'should include a sub template within a sub template');

        test.done();
    },
    render_all_vocabs: function (test) {
        var vocabs_to_test = ['arabic', 'chinese', 'english', 'mundo'],
            actual,
            expected,
            current_language;

        test.expect(vocabs_to_test.length);

        for (var i = 0; i < vocabs_to_test.length; i++) {
            current_language = vocabs_to_test[i];
            actual           = grunt.file.read('test/output/render_all_vocabs/' + current_language + '/index.html');
            expected         = grunt.file.read('test/expected/render_all_vocabs/' + current_language + '/index.html');
            test.equal(actual, expected, 'should create an ' + current_language + ' version of the site');         
        }
        
        test.done();
    },
    bb_code: function (test) {
        test.expect(4);

        var actual, expected;

        actual   = grunt.file.read('test/output/bb_code/english/bb_code_bold.html');
        expected = grunt.file.read('test/expected/bb_code/english/bb_code_bold.html');

        test.equal(actual, expected, 'should parse {B} and {/B} into strong tags');

        actual   = grunt.file.read('test/output/bb_code/english/bb_code_paragraph.html');
        expected = grunt.file.read('test/expected/bb_code/english/bb_code_paragraph.html');

        test.equal(actual, expected, 'should parse {P} and {/P} into paragraph tags');

        actual   = grunt.file.read('test/output/bb_code/english/bb_code_url.html');
        expected = grunt.file.read('test/expected/bb_code/english/bb_code_url.html');

        test.equal(actual, expected, 'should parse {URL=X}Y{/URL} into a href tag (<a href="X">Y</a>)');

        actual   = grunt.file.read('test/output/bb_code/english/bb_code_mixed.html');
        expected = grunt.file.read('test/expected/bb_code/english/bb_code_mixed.html');

        test.equal(actual, expected, 'should parse multiple BB in a vocab into mark up');

        test.done();
    }
};