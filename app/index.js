'use strict';

var join = require('path').join;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.pkg = require('../package.json');
  },

  askFor: function() {
    var done = this.async();

    this.log(yosay(chalk.yellow("Say yes to the KSS")));

    var prompts = [{
      type: 'confirm',
      name: 'libSass',
      value: 'useLibSass',
      message: "Would you like to use " + chalk.green("LibSass") + "? " +
        "Otherwise, we'll install " + chalk.magenta("Ruby Sass"),
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.useRubySass = !props.libSass;
      this.useLibSass  = props.libSass;

      done();
    }.bind(this));
  },

  gruntfile: function() {
    this.template('Gruntfile.js');
  },

  packageJSON: function() {
    this.template('_package.json', 'package.json');
  },

  scssLint: function() {
    this.template('scss-lint.yml', '.scss-lint.yml');
  },

  git: function() {
    this.template('gitignore', '.gitignore');
  },

  gemfile: function() {
    this.template('_Gemfile', 'Gemfile');
  },

  sass: function() {
    this.template('application.scss', 'stylesheets/application.scss');
    this.template('_example-buttons.scss', 'stylesheets/_example-buttons.scss');
  },

  end: function () {
    if (!this.options['skip-install']) {
      this.installDependencies({
        skipInstall: this.options['skip-install'],
        callback: function () {
          this.spawnCommand('grunt', ['shell']);
        }.bind(this)
      });
    }
  }
});
