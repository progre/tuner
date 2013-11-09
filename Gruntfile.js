module.exports = function(grunt) {
  var jadeFiles = grunt.file.expandMapping(
    ['src/public/**/*.jade'], 'public/', {
      rename: function(destBase, destPath) {
        return destBase + destPath.replace(/^src\/public\//, '').replace(/\.jade$/, ".html");
      }
    }
  )

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      tsd: {
        cmd: function() {
          var dependencies = [
          ];
          return 'tsd install ' + dependencies.join(' ');
        }
      }
    },
    watch: {
      jade: {
        files: ['src/public/**/*.jade'],
        tasks: ['jade:debug']
      },
      stylus: {
        files: ['src/public/**/*.styl'],
        tasks: ['stylus'],
      },
      typescript: {
        files: ['src/public/**/*.ts'],
        tasks: ['typescript']
      },
      public: {
        files: ['public/**/*.*'],
        options: {
          livereload: true
        }
      }
    },
    jade: {
      release: {
        files: jadeFiles
      },
      debug: {
        files: jadeFiles,
        options: {
          data: {
            debug: true
          }
        }
      }
    },
    stylus: {
      compile: {
        options: {
          urlfunc: 'embedurl'
        },
        files: {
          'public/css/style.css': 'src/public/css/style.styl'
        }
      }
    },
    typescript: {
      base: {
        src: ['src/public/**/*.ts'],
        dest: '',
        options: {
          module: 'amd',
          base_path: 'src',
          sourcemap: true,
          fullSourceMapPath: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          name: 'main.min',
          baseUrl: 'public/js',
          mainConfigFile: 'public/js/config.js',
          out: 'public/js/main.min.js'
        }
      }
    },
    connect: {
      server: {
        options: {
          base: 'public'
        }
      }
    },
    copy: {
      deploy: {
        files: [{
          expand: true,
          cwd: 'public/',
          src: [
            '**',
            '!**/*.map', '!js/**/*.js',
            'js/**/*.min.js'
          ],
          dest: 'dist/',
          filter: 'isFile'
        }]
      }
    }
  });
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', [
    'debug-build',
    'connect',
    'watch'
  ]);
  grunt.registerTask('deploy', [
    'release-build',
    'copy'
  ]);
  grunt.registerTask('tsd', [
    'exec:tsd'
  ]);
  grunt.registerTask('debug-build', [
    'jade:debug',
    'stylus',
    'typescript'
  ]);
  grunt.registerTask('release-build', [
    'jade:release',
    'stylus',
    'typescript',
    'requirejs'
  ]);
};