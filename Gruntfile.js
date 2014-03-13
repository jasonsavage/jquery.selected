
/**
 * Grunt task runner file used to build project. 
 */

module.exports = function(grunt) 
{
    "use strict";
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        concat: {
            options: {
              separator: ' ',
            },
            dist: {
              src: ['src/*.js'],
              dest: 'jquery.selected.js',
            },
        },
        
        wrap: {
            basic: {
                src: ['jquery.selected.js'],
                dest: 'jquery.selected.js',
                options: {
                    wrapper: ['(function ($) {\n', '\n}(jQuery));']
                }
            }
        },
        
        //uglify task config
        uglify: {
          options: {
            banner: '/**\n * <%= pkg.name %> \n * @version <%= pkg.version %> \n * @author jasonsavage \n * last build: <%= grunt.template.today("mm-dd-yyyy") %> \n */\n'
          },
          build: {
            src: 'jquery.selected.js',
            dest: 'jquery.selected.min.js'
          }
    },
    });

  // Load the plugins that provide each task.
  grunt.loadNpmTasks('grunt-wrap');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'wrap','uglify']);

};