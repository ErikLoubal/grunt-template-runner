/*
 * grunt-template-runner
 * https://github.com/ErikLoubal/grunt-template-runner
 *
 * Copyright (c) 2013 Erik Loubal
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var i18n = require("i18n");    
    
  var _ = grunt.util._;
  

  grunt.registerMultiTask('template_runner', 'Your task description goes here.', function() {
    var options = this.options({
      i18n: true,
      locales : [],
      directory: 'locales',
      data: {},
      variable: null // Avoid underscore's template to use "with(...)"
    });
    grunt.verbose.writeflags(options, 'Options');
    
    if (this.files.length < 1) {
      grunt.log.warn('Destination not written because no source files were provided.');
    }

    if(options.variable){
      _.templateSettings.variable = options.variable;
    }
    
    // if i18n active
    if(options.i18n){
      if(options.locales.length < 1 || options.locales[0].length < 1) {
        grunt.log.warn('Cannot run internationalization without any locale defined.');
      }    
        
      _.templateSettings = {
        interpolate: /(_\(.+?\))/g
      };
    }
    
    // For each language
    var languages = (options.locales.length < 1) ? [''] : options.locales;
    var files = this.files;
    languages.forEach(function(lng) {
        if(options.i18n){
          i18n.configure({
            locales: options.locales,
            directory: options.directory,
            defaultLocale: lng
          });
        }
        
        // Iterate over all specified file groups.
        files.forEach(function(f) {
          // Concat specified files after template's execution
          var src = f.src.filter(function(filepath) {
            // Warn on and remove invalid source files (if nonull was set).
            if (!grunt.file.exists(filepath)) {
              grunt.log.warn('Source file "' + filepath + '" not found.');
              return false;
            } else {
              return true;
            }
          }).map(function(filepath) {
            // Read source template.
            var compiled = _.template(grunt.file.read(filepath));
            var data = options.data;
            data._ = i18n.__;
            return compiled(data);
          }).join('\n');
    
          
          var d = f.dest;
          if(options.i18n && lng.length > 0){
            var idx = f.dest.lastIndexOf('.');
            d = f.dest.slice(0, idx) + '_' + lng + f.dest.slice(idx);
          }
          // Write the destination file.
          grunt.file.write(d, src);
    
          // Print a success message.
          grunt.log.writeln('File "' + d + '" created.');
        });
    });
  });

};
