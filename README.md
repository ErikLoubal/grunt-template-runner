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


## Thanks

This project was originally forked from Erik Loubal's [grunt-template-runner](https://github.com/ErikLoubal/grunt-template-runner).  This didn't quite do what I wanted it to do, but was an excellent starting point.  This project would have taken MUCH longer with grunt-template-runner, thank you Erik.