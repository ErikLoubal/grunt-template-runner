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
  default_text: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default.txt');
    var expected = grunt.file.read('test/expected/default.txt');
    test.equal(actual, expected, 'should use bare replacement in plain text template.');

    test.done();
  },
  languages: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/basic_en.html');
    var expected = grunt.file.read('test/expected/basic_en.html');
    test.equal(actual, expected, 'should use default key string as i18n.');
    
    actual = grunt.file.read('tmp/basic_fr.html');
    expected = grunt.file.read('test/expected/basic_fr.html');
    test.equal(actual, expected, 'should apply i18n (fr).');

    test.done();
  },
};
