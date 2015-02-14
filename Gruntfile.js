module.exports = function (grunt) {

	'use strict';
    
	grunt.initConfig({
		less: {
		    options: {
                compress: true
		    },
            production: {
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
            production: {
                files: {
                    'slider.min.js': 'slider.js'
                }
            }
        },
        jslint: {
            development: {
                src: [ 'slider.js' ],
                directives: {
                    jQuery: true
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
				tasks: ['jslint', 'uglify']
			}
		}
	});
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['uglify', 'less']);
};