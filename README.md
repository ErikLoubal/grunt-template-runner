[![NPM](https://nodei.co/npm/grunt-multi-lang-site-generator.png?compact=true)](https://www.npmjs.com/package/grunt-multi-lang-site-generator) [![Build Status](https://travis-ci.org/BBCVisualJournalism/grunt-multi-lang-site-generator.svg)](https://travis-ci.org/BBCVisualJournalism/grunt-multi-lang-site-generator)

# grunt-multi-lang-site-generator

Creates multiple language versions of a site based on vocab JSON files and templates.  Example:

```
grunt.initConfig({
  multi_lang_site_generator: {
    default: {
      options: {
        vocabs:           ['english', 'mundo'],
        vocab_directory:  'vocabs'
      },
      files: {
        'index.html': ['templates/index.html.tmpl']
      }
    }
  }
});
```

Will take vocab objects and templates:

```
templates/index.html.tmpl
vocabs/english.json
vocabs/mundo.json
```

And create the following output:

```
english/index.html
mundo/index.html
```

The vocab objects are JSON, each property corresponds to a variable in the template file...

```
{
foo: "bar"
}
```

```
<p><%= foo %></p>
```

It uses [lodash's template engine](http://lodash.com/docs#template).

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-multi-lang-site-generator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-multi-lang-site-generator');
```

## The "multi-lang-site-generator" task
_Run this task with the `grunt less` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### vocab
Type: `Array`
Default value: `{}`

Mandatory list of languages to use to make a translated site with.  Each item in the array must correspond to a JSON file in the vocab directory.  Each item label will be used to name the language site directory with.

Use the value `['*']` or `'*'` if you want to render all vocabs in your vocab directory.

#### vocab_directory
Type: `String`
Default value: ''

Mandatory path relative from your grunt file where your vocab JSON files reside. 

#### output_directory
Type: `String`
Default value: ''

Optional directory to output the language sites to.  By default an 'english' translated site will be created next to your grunt file.  If you wanted it to be created in a 'site' directory, set `output_directory` to 'site'.

#### data
Type: `JSON`
Default value: `{}`

Optional additional data to pass into the template.  This is useful for data values you want to pass into the templates that are common for each site, e.g. domain values for assets.

#### template_directory
Type: `String`
Default value: ''

Optional path relative from your grunt file where your templates reside.  This is useful if you are creating multiple files and do not want to repeat the template directory path many times.


### Special variables

When the templates run, there are additional template variables available that are not defined by the vocab or options.data object.  This are:

`<%= vocab_dir %>` - name of directory template is being rendered into, e.g. 'english'.

### Sub templates

You can reference other templates with your templates, for example the template `main.tmpl`:

```
hello <%= include('other_template.tmpl') %>
```

Will include all the content from the template `other_template.tmpl`.  Sub templates have all the same functionality as normal templates, so you can reference the vocabs and add JavaScript into it.

#### Passing values between templates

Each template is scoped locally, so you cannot reference a JS variable set in a template from an included template.  E.g.

```
// MAIN.TMPL
<% var title = "Index page"; %>
<% include("header.tmpl") %>
<h1><%= title %></h1> // outputs "Index page"


// HEADER.TMPL
<html>
<head>
<title><%= title %></title> // Throws an error
</head>
<body>
```

To pass variables set in your template to included templates, use the optional 2nd parameter in the include call, e.g.

```
// MAIN.TMPL
<% var title = "Index page"; %>
<% include("header.tmpl", {
  title: title
}) %>
<h1><%= title %></h1> // outputs "Index page"


// HEADER.TMPL
<html>
<head>
<title><%= title %></title> // outputs "Index page"
</head>
<body>

```

### User defined functions and passed in data

Any data passed in from the vocab files or the optional `data` parameter are available as local variables within the templates and sub templates.

Unfortunately they are not available within the closure of functions that are defined within your templates.  For example, if you ran this grunt config setup and template:

```
grunt.initConfig({
  multi_lang_site_generator: {
    default: {
      options: {
        vocabs:           ['english', 'mundo'],
        vocab_directory:  'test/fixtures/vocabs',
        output_directory: 'test/output/extra_data/',
        data: {
          "foo": "bar"
        }
      },
      files: {
        'index.html': 'templates/index.html.tmpl'
      }
    }
  }
});

// index.html.tmpl
console.log(foo); // outputs "bar";
function subFunc() {
  console.log(foo); // returns undefined
}
subFunc();
```

The var `foo` passed in from the data option would be recognised in the scope of the module (i.e. file (files are modules in node.js)) but would not be recognised in the scope of the user defined function `subFunc`.

Thankfully lo-dash.js has an object called `obj` which is referenceable anywhere in the template.  So changing the example to this makes the var `foo` referenceable in the user defined function:

```
// index.html.tmpl
console.log(foo); // outputs "bar";
function subFunc() {
  console.log(obj.foo); // returns "bar"
}
subFunc();
```

### BB Code

You can use Bulletin Board (BB) inside of vocabs, the BB code will be replaced with HTML markup when generating. Currently supported BB code's are strong, paragraphs and URL's.

The generator will firstly process the BB code into markup. The processed vocabs are then passed to lodash's template method to generate the final markup files. Therefore you can **only use BB code inside vocab files** and not the template files. 

### Paragraph tags
```
{P}This is a paragraph.{/P}
```
Will generate
```
<p>This is a paragraph.</p>
```

### Bold tags
```
This sentence contains {B}important information{/B} 
```
Will generate
```
This sentence contains <strong>important information</strong> 
```


### URL tags

A URL tag must contain a URL parameter and must surround the content that will become a link.

```
Check out this {URL=http://example.com}example{/URL}
```
Will generate
```
Check out this <a href="http://example.com">example</a> 
```



## Thanks

This project was originally forked from Erik Loubal's [grunt-template-runner](https://github.com/ErikLoubal/grunt-template-runner).  This didn't quite do what I wanted it to do, but was an excellent starting point.  This project would have taken MUCH longer without grunt-template-runner, thank you Erik.
