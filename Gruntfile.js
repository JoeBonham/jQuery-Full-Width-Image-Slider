module.exports = function (grunt) {

	'use strict';
    
	grunt.initConfig({
		less: {
            development: {
			    options: {
                    compress: true
			    },
			    files: {
			        "slider.min.css" : "style.less"
			    }
            },
		},
        uglify: {
            compress: {
                options: {
                    drop_console: true
                }
            },
            development: {
                files: {
                    'slider.min.js': 'slider.js'
                }
            }
        },
		watch : {
			css: {
				files: '*.less',
				tasks: 'less'
			},
			js: {
				files: '*.js',
				tasks: 'uglify'
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.registerTask('default', ['uglify', 'less']);
};