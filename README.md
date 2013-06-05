# grunt-template-runner

> Runs i18n and template engine at grunt's compile time.

## Goal
Simple source file translation tool at grunt's compile time : any source file (no matter its format) may be easily translated using [i18n-node](https://github.com/mashpie/i18n-node) or [node-gettext](https://github.com/andris9/node-gettext).

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-template-runner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-template-runner');
```

## The "template_runner" task
_Run this task with the `grunt less` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Overview
In your project's Gruntfile, add a section named `template_runner` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  template_runner: {
    basic: {
      options: {
        // Task-specific options go here.
      },
      files: {
        // Target-specific file lists go here.
      },
    },
  },
})
```
> #### Destination folder
> If the destination isn't a file name but a folder name (either a trailing '/' or the name of an existing folder) each input file will result in the generation of a new destination file for each specified language (see folder example below). 

### Options

#### data
Type: `JSON`
Default value: `{}`

Additional manual data which may be provided as template source data.

#### directory
Type: `String`
Default value: `locales`

Specifies directory where sources json translation data files will be read. For [i18n-node](https://github.com/mashpie/i18n-node) this directory should contain translation data for each language in a file named _language_.json (eg. en.json). For [node-gettext](https://github.com/andris9/node-gettext) this directory should contain translation data for each language in a file named prefix_language.json with prefix as `gettext` option value and language as language code (eg. default_de.json)

#### extension
Type: `String`
Default value: `null`

If not null, this extension will override file extension for all generated files.

#### gettext
Type: `String`
Default value: `null`

Defines gettext prefix files. If null gettext isn't use an default i18n-node is used.

#### gettext_suffix
Type: `String`
Default value: `mo`

Defines gettext suffix (extension). May be either `mo` to use binary `.mo` or `po` to use `.po` files.

#### i18n
Type: `Boolean`
Default value: `true`

If true internationalization will be used, otherwise the bare templating rendering is used.

#### locales
Type: `String|Array`
Default value: `[]`

Defines the list of all availables locales (ie. languages).

#### variable
Type: `String`
Default value: `null`

Optional [Underscore's template variable](http://underscorejs.org/#template) attribute.


### Usage Examples

#### Internationalization
In this example, an i18n mechanism is used at grunt's compile time using files containing simple gettext like tags.
It internally uses [i18n-node](https://github.com/mashpie/i18n-node) to provide translations.
Here is a sample execution case of the following configuration :

 *  if the `src/basic.html` contains some html with included translations : `<div>Title _('Hello')</div>`
 *  and if the `locales` directory contains only a `fr.json` translation file containing :
`{ "Hello": "Bonjour" }`
 * then this configuration will generate two destination files containing translated content :
 * basic_en.html containing : `<div>Title Hello</div>`
 * basic_fr.html containing : `<div>Title Bonjour</div>`

```js
grunt.initConfig({
  template_runner: {
    options: {
      locales: ['en', 'fr'],
      directory: 'locales'
    },
    files: {
      'dest/basic.html': ['src/basic.html'],
    },
  },
})
```

---
#### Destination folder
This is basically the same example as the last one despite the destination file is a folder name.
As the destination isn't a single file, each source file will generate a new file in the destination folder. Eg. for configuration below both `basic_en.html` and `another_en.hbs` will be created in the `dest` folder.

```js
grunt.initConfig({
  template_runner: {
    options: {
      locales: ['en'],
      directory: 'locales'
    },
    files: {
      'dest/': ['src/basic.html', 'src/another.hbs'],
    },
  },
})
```

---
#### Gettext
This example shows how to use gettext's mo translation files. The `gettext` option defines the name of files to load in the translation directory. Defaults behavior uses `.mo` gettext binary files, in this example the `gettext_suffix` option is set in order to use `.po`.

```js
grunt.initConfig({
  template_runner: {
    options: {
      locales: ['en', 'fr'],
      directory: 'locales',
      gettext: 'default',
      gettext_suffix: 'po'
    },
    files: {
      'dest/': ['src/basic.html', 'src/another.hbs'],
    },
  },
})
```

---
#### Bare template
In this example, the bare [Underscore template](http://underscorejs.org/#template) is used, usage of bare templating isn't the most useful part of this plugin but it's still here.
The mandatory part in to disable internationalization by using `i18n: false` option.
If input file contains an ERB string its contents gets updated using template data provided in the options. Eg.
If source contains `Plain text template <%= name %>` the result of the following configuration should be `Plain text template Erik`.

```js
grunt.initConfig({
  template_runner: {
    options: {
      i18n: false,
      data: {name : 'Erik'}
    },
    files: {
      'dest/myDest.txt': ['src/mySource.txt'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.2.1 - Add gettext for both 'mo' and 'po'.
0.2.0 - Add gettext usage.
0.1.1 - Add internationalization.
0.1.0 - Initial version.
