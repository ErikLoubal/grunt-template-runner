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
  basic_i18n: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/basic_en.html');
    var expected = grunt.file.read('test/expected/basic_en.html');
    test.equal(actual, expected, 'should use default key string as i18n.');
    
    actual = grunt.file.read('tmp/basic_fr.html');
    expected = grunt.file.read('test/expected/basic_fr.html');
    test.equal(actual, expected, 'should apply i18n (fr).');

    test.done();
  },
  no_extension: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/no_extension_en');
    var expected = grunt.file.read('test/expected/no_extension_en');
    test.equal(actual, expected, 'should allow destination file without extension.');

    test.done();
  },
  folders: function(test) {
    test.expect(6);

    var actual = grunt.file.read('tmp/folder/test1_en.html');
    var expected = grunt.file.read('test/expected/folder/test1_en.html');
    test.equal(actual, expected, 'should allow folders as destination');
    
    actual = grunt.file.read('tmp/folder/test1_fr.html');
    expected = grunt.file.read('test/expected/folder/test1_fr.html');
    test.equal(actual, expected, 'should allow folders as destination');

    actual = grunt.file.read('tmp/folder/test2_en.hbs');
    expected = grunt.file.read('test/expected/folder/test2_en.hbs');
    test.equal(actual, expected, 'should allow folders as destination');
    
    actual = grunt.file.read('tmp/folder/test2_fr.hbs');
    expected = grunt.file.read('test/expected/folder/test2_fr.hbs');
    test.equal(actual, expected, 'should allow folders as destination');
    
    actual = grunt.file.read('tmp/folder/test3_en.md').trim();
    expected = grunt.file.read('test/expected/folder/test3_en.md').trim();
    test.equal(actual, expected, 'should allow folders as destination');
    
    actual = grunt.file.read('tmp/folder/test3_fr.md').trim();
    expected = grunt.file.read('test/expected/folder/test3_fr.md').trim();
    test.equal(actual, expected, 'should allow folders as destination');

    test.done();
  },
  gettext: function(test) {
    test.expect(6);

    var actual = grunt.file.read('tmp/fg/test1_en.html');
    var expected = grunt.file.read('test/expected/folder/test1_en.html');
    test.equal(actual, expected, 'should use gettext for translation');
    
    actual = grunt.file.read('tmp/fg/test1_fr.html');
    expected = grunt.file.read('test/expected/folder/test1_fr.html');
    test.equal(actual, expected, 'should use gettext for translation');

    actual = grunt.file.read('tmp/fg/test2_en.hbs');
    expected = grunt.file.read('test/expected/folder/test2_en.hbs');
    test.equal(actual, expected, 'should use gettext for translation');
    
    actual = grunt.file.read('tmp/fg/test2_fr.hbs');
    expected = grunt.file.read('test/expected/folder/test2_fr.hbs');
    test.equal(actual, expected, 'should use gettext for translation');
    
    actual = grunt.file.read('tmp/fg/test3_en.md').trim();
    expected = grunt.file.read('test/expected/folder/test3_en.md').trim();
    test.equal(actual, expected, 'should use gettext for translation');
    
    actual = grunt.file.read('tmp/fg/test3_fr.md').trim();
    expected = grunt.file.read('test/expected/folder/test3_fr.md').trim();
    test.equal(actual, expected, 'should use gettext for translation');

    test.done();
  },
};
