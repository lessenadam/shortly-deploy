module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      scripts: {
        src: 'public/client/**/*.js',
        dest: 'public/dist/js/scripts.js',
      }
    },

    gitpush: {
      server: {
        options: {
          remote: 'server', 
          branch: 'master'
        }
      }

    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      scripts: {
        src: 'public/client/**/*.js',
        dest: 'public/dist/js/scripts.js',
      }
    },

    eslint: {
      target: [
        'public/client/**/*.js'
      ]
    },

    cssmin: {
      css: {
        src: 'public/*.css',
        dest: 'public/dist/css/style.css'
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },

    // run watch and nodemon at the same time
    // https://scotch.io/tutorials/using-gruntjs-in-a-mean-stack-application
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }   

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('server-dev', function (target) {
    // grunt.task.run([ 'nodemon', 'watch' ]);
    grunt.task.run([ 'concurrent' ]);

  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      console.log("GOT TO PROD");
      // add your production server task here
      grunt.task.run(['gitpush']);
    } else {
      console.log("GOT TO EL");
      //grunt.task.run([ 'server-dev' ]);
    }
  });
  // difference between 102 and 79
  grunt.registerTask('deploy', [ 
    'eslint', 'test', 'upload' 
  ]);


  grunt.registerTask('AJ', [ 
    'upload' 
  ]);

};
