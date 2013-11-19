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
  setUp: function(done) {
    done();
  },
  vocabs_to_sites: function (test) {
    test.expect(2);

    var actual =   grunt.file.read('test/output/vocabs_to_sites/english/index.html');
    var expected = grunt.file.read('test/expected/vocabs_to_sites/english/index.html');
    test.equal(actual, expected, 'should create an english version of the site');
    
    var actual =   grunt.file.read('test/output/vocabs_to_sites/mundo/index.html');
    var expected = grunt.file.read('test/expected/vocabs_to_sites/mundo/index.html');
    test.equal(actual, expected, 'should create a mundo version of the site');

    test.done();
  },
  extra_data: function (test) {
    test.expect(2);

    var actual =   grunt.file.read('test/output/extra_data/english/index.html');
    var expected = grunt.file.read('test/expected/extra_data/english/index.html');
    test.equal(actual, expected, 'should create an english version of the site with extra data from the grunt file');
    
    var actual =   grunt.file.read('test/output/extra_data/mundo/index.html');
    var expected = grunt.file.read('test/expected/extra_data/mundo/index.html');
    test.equal(actual, expected, 'should create a mundo version of the site with extra data from the grunt file');

    test.done();
  },
  multiple_files: function (test) {
    test.expect(2);

    var actual =   grunt.file.read('test/output/multiple_files/english/index.html');
    var expected = grunt.file.read('test/expected/multiple_files/english/index.html');
    test.equal(actual, expected, 'should create an index file');
    
    var actual =   grunt.file.read('test/output/multiple_files/english/page.html');
    var expected = grunt.file.read('test/expected/multiple_files/english/page.html');
    test.equal(actual, expected, 'should create a page file');

    test.done();
  },
  template_directory_option: function (test) {
    test.expect(1);

    var actual =   grunt.file.read('test/output/template_directory_option/english/index.html');
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
  }
};
