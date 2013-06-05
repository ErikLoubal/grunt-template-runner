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
  var fs = require('fs');
  var Gettext = require("node-gettext");
    
  var _ = grunt.util._;
  

  grunt.registerMultiTask('template_runner', 'Your task description goes here.', function() {
    var options = this.options({
      i18n: true,
      locales : [],
      directory: 'locales',
      extension: null,
      gettext: null,
      gettext_suffix: 'mo',
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
    
    // gettext
    var gt = null;
    
    // if i18n active
    if(options.i18n){
      if(options.locales.length < 1 || options.locales[0].length < 1) {
        grunt.log.warn('Cannot run internationalization without any locale defined.');
      }    
        
      _.templateSettings = {
        interpolate: /(_\(.+?\))/g
      };
      
      if(options.gettext){
          gt = new Gettext();
          var prefix = options.directory + '/' + options.gettext;
          options.locales.forEach(function(lng) {
              var gtfile = prefix + '_' + lng + '.' + options.gettext_suffix;
              if(grunt.file.exists(gtfile)){
                  var fileContents = fs.readFileSync(gtfile);
                  gt.addTextdomain(lng, fileContents);
              } else {
                  grunt.log.warn('Translation file not found for language "' + lng + '" (file "' + gtfile + '").');
              }
          });
      }
    }
    
    var languages = (options.locales.length < 1) ? [''] : options.locales;
    var files = this.files;
    // For each language
    languages.forEach(function(lng) {
        if(options.i18n){
          if(gt){
            gt.textdomain(lng);
          }
          else {
            i18n.configure({
              locales: options.locales,
              directory: options.directory,
              defaultLocale: lng
            });
          }
        }
        
        // Iterate over all specified file groups.
        files.forEach(function(f) {
          // Template's execution
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
            if(gt){
              data._ = function(f) {
                  return gt.gettext(f);
              };
            } else {
              data._ = i18n.__;
            }
            return compiled(data);
          });

          // Build destination name
          var folder = false;
          if(grunt.file.isDir(f.dest) || f.dest.charAt(f.dest.length-1) === '/'){
              folder = true; // if already an existing folder or ends with '/' : 
                               // force folder output
          }
          else {
              // If destination isn't a directory (ie. single file) : concatenate results 
              src = src.join('\n');  
          }
          if(folder){
              for(var i = 0; i < src.length; i++){
                  var srcFile = f.src[i];
                  var filename = f.dest + '/'; 
                  if(options.i18n && lng.length > 0){
                      filename += getOutputName(srcFile.replace(/^.*[\\\/]/, ''), lng, options.extension);
                  } else {
                      filename += getOutputName(srcFile.replace(/^.*[\\\/]/, ''), '', options.extension);
                  }
                  // Write the destination files.
                  grunt.file.write(filename, src[i]);
                  grunt.log.writeln('File "' + filename + '" created.');
              }
          } else {
            var d = f.dest;
            if(options.i18n && lng.length > 0){
                d = getOutputName(f.dest, lng, options.extension);
            }
            // Write the destination file.
            grunt.file.write(d, src);
            grunt.log.writeln('File "' + d + '" created.');
          }
        });
    });
  });

  var getOutputName = function(n, lng, extension) {
      var name = n;
      var idx = n.lastIndexOf('.');
      if(idx > -1){
        if(extension || typeof extension === "string"){
            name = n.slice(0, idx) + '_' + lng + extension;
        } else {
          name = n.slice(0, idx) + '_' + lng + n.slice(idx);
        }
      } else {
          if(extension || typeof extension === "string"){
          name = n + '_' + lng + extension;
        } else {
          name = n + '_' + lng;
        }
      }
      return name;
  };
};
