module.exports = function (grunt) {
  "use strict";

  // set livereload to random port in range 10000-60000
  process.env['LIVERELOAD_PORT'] = process.env['LIVERELOAD_PORT'] || Math.floor(Math.random()*50000)+10000;

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    connect: {
      kss: {
        options: {
          port: 9000,
          base: 'styleguide',
          keepalive: true,
          livereload: process.env['LIVERELOAD_PORT']
        }
      }
    },

    sass: {
      kss: {
        files: {
          'stylguide/application.css': 'stylesheets/**/*',
        },
        options: {
          style: 'expanded',
          cacheLocation: 'tmp/.sass-cache'
        }
      }
    },

    kss: {
      options: {
        template: 'template/',
        includeType: 'sass'
      },
      dist: {
        files: {
          'styleguide': ['stylesheets/**'],
        }
      }
    },

    watch: {
      files: [
        'stylesheets/**/*',
        'template/**/*',
        'stylesheets/styleguide.md'
      ],
      tasks: ['kss:build'],
      options: {
        spawn: false,
        livereload: {
          port: process.env['LIVERELOAD_PORT']
        }
      }
    },

    concurrent: {
      kss: {
        tasks: ['watch', 'connect:kss'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    scsslint: {
      allFiles: [
        'dist/stylesheets/**/*.scss'
      ],
      options: {
        config: '.scss-lint.yml',
        colorizeOutput: true,
        compact: true
      }
    },

    shell: {
      kssinit: {
        command: 'kss-node --init template',
        options: {
          stdout: true,
          failOnError: true
        }
      }
    },

    availabletasks: {
      tasks: {}
    }
  });

  grunt.registerTask('default', 'availabletasks');

  grunt.registerTask(
    'kss:serve',
    'Start up a server and watch for changes in the Sass. The server can be accessed at http://localhost:9000',
    [
      'kss',
      'concurrent:kss'
    ]
  );

  grunt.registerTask(
    'lint',
    'Lint scss files for formatting errors',
    ['scsslint']
  );
};
