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
      output_directory:   false,
      template_directory: '',
      sub_templates:      ''
    });
    grunt.verbose.writeflags(options, 'Options');
    

    if (options.vocabs.length < 1) {
      grunt.log.warn('Cannot run without any vocabs defined.');
    }

    if (this.files.length < 1) {
      grunt.log.warn('Destination not written because no source files were provided.');
    }

    add_forward_slash_to_end_of_dir_paths(options);

    if (options.sub_templates != '') {
      options.sub_templates.forEach(function (sub_template) {
        var content       = fs.readFileSync(options.template_directory + sub_template),
            template_name = sub_template.replace(/\//g, "_");
        if (template_name.indexOf(".") > -1) {
          template_name = template_name.split(".")[0];
        }
        options.data[template_name] = content.toString();
      });
    }

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
              data              = _.merge(options.data, vocab_data, special_variables),
              src               = _.template(grunt.file.read(options.template_directory + f.orig.src[0]), data),
              dest              = options.output_directory + lng + '/' + f.dest;

            // Write the destination file.
            grunt.file.write(dest, src);
            grunt.log.writeln('File "' + dest + '" created.');

        });

    });
  });

};
