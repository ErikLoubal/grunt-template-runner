'use strict';

module.exports = function(grunt) {

  var _ = require("lodash");

  grunt.registerMultiTask('multi_lang_site_generator', 'Create multiple translated sites based on templates and vocab json objects.', function() {
    var options = this.options({
      vocabs : [],
      data: {},
      output_directory: false,
      template_directory: ''
    });
    grunt.verbose.writeflags(options, 'Options');
    

    if (options.vocabs.length < 1) {
      grunt.log.warn('Cannot run without any vocabs defined.');
    }

    if (this.files.length < 1) {
      grunt.log.warn('Destination not written because no source files were provided.');
    }

    var languages = (options.vocabs.length < 1) ? [''] : options.vocabs;
    var files = this.files;
    // For each language
    languages.forEach(function(lng) {

        // Iterate over all specified file groups.
        files.forEach(function(f) {

          var vocab_data = JSON.parse(grunt.file.read(options.vocab_directory + '/' + lng + '.json')),
              data       = _.merge(options.data, vocab_data),
              src        = _.template(grunt.file.read(options.template_directory + f.orig.src[0]), data),
              dest       = '';

            if (options.output_directory) {
              dest = options.output_directory + '/';
            }

            dest += lng + '/' + f.dest;

            // Write the destination file.
            grunt.file.write(dest, src);
            grunt.log.writeln('File "' + dest + '" created.');

        });

    });
  });

};
