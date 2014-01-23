'use strict';

module.exports = function(grunt) {

  var _  = require("lodash"),
      fs = require("fs");

  function add_forward_slash_to_end_of_dir_paths (options) {
    if (
      (options.template_directory !== '') && 
      (options.template_directory.substr(-1) !== '/')
    ) {
      options.template_directory += '/';
    }
    if (
      (options.vocab_directory !== '') && 
      (options.vocab_directory.substr(-1) !== '/')
    ) {
      options.vocab_directory += '/';
    }
    if (
      (options.output_directory !== '') && 
      (options.output_directory.substr(-1) !== '/')
    ) {
      options.output_directory += '/';
    }
  }

  grunt.registerMultiTask('multi_lang_site_generator', 'Create multiple translated sites based on templates and vocab json objects.', function() {
    var options = this.options({
      vocabs :            [],
      data:               {},
      output_directory:   '',
      template_directory: '',
      sub_templates:      '',
      vocab_directory:    ''
    });
    grunt.verbose.writeflags(options, 'Options');
    

    if (options.vocabs.length < 1) {
      grunt.log.warn('Cannot run without any vocabs defined.');
    }

    if (this.files.length < 1) {
      grunt.log.warn('Destination not written because no source files were provided.');
    }

    add_forward_slash_to_end_of_dir_paths(options);

    var languages = (options.vocabs.length < 1) ? [''] : options.vocabs;
    var files = this.files;
    // For each language
    languages.forEach(function(lng) {

        // Iterate over all specified file groups.
        files.forEach(function(f) {

          var vocab_data        = JSON.parse(grunt.file.read(options.vocab_directory + lng + '.json')),
              special_variables = {
                vocab_dir: lng
              },
              data = _.merge(options.data, vocab_data, special_variables),
              src  = _.template(
                       grunt.file.read(options.template_directory + f.orig.src[0]), 
                       data,
                       {
                         'imports': {
                           include: function (tmpl, params) {
                              params = params || {};
                              var include_data = _.merge(data, params)
                              return _.template(
                                fs.readFileSync(options.template_directory+tmpl).toString(), 
                                include_data,
                                {
                                 'imports': {
                                   include: function (tmpl, params) {
                                     params = params || {};
                                     var include_data = _.merge(data, params);
                                     return _.template(fs.readFileSync(options.template_directory+tmpl).toString(), include_data);
                                   }
                                 } 
                               }
                              );
                           }
                         } 
                       }),
              dest = options.output_directory + lng + '/' + f.dest;

            // Write the destination file.
            grunt.file.write(dest, src);
            grunt.log.writeln('File "' + dest + '" created.');

        });

    });
  });

};
