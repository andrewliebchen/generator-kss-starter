# Yeoman KSS starter

A Yeoman generator that scaffolds a living Sass styleguide with KSS and Grunt.

## Features

* Sass compilation with either Ruby or LibSass.
* KSS (thanks to [kss-node](https://github.com/kss-node/kss-node)) installed and ready to go.
* Grunt task that make building the styleguide a cinch.
* Run the styleguide locally with a development server.
* Lint task included to help keep your code neat.

## Getting started

* Install `npm install -g generator-kss-starter`.
* Run `yo kss-starter`.
* Done!

## Grunt tasks

From the commandline, you can run `$grunt` to see a list of available tasks.

* `grunt kss` compiles Sass and builds the KSS styleguide
* `grunt kss:serve` spins up a development server at http://localhost:9000
* `grunt lint` runs [scss-lint](https://github.com/causes/scss-lint) against your Sass files
