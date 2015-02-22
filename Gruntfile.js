module.exports = function (grunt) {

	'use strict';
	
	require('jit-grunt')(grunt);
    
	grunt.initConfig({
		less: {
		    options: {
                compress: true
		    },
            production: {
			    files: { 
			        "slider.min.css" : "slider.less"
			    }
            },
		},
        uglify: {
            options: {
                drop_console: true
            },
            production: {
                files: {
                    'slider.min.js': 'slider.js'
                }
            }
        },
        jshint: { 
            options: {
                bitwise:   true,
                camelcase: true,
                eqeqeq:    true,
                freeze:    true,
                immed:     true,
                indent:    2,
                latedef:   true,
                newcap:    true,
                noempty:   true,
                nonew:     true,
                nonbsp:    true,
                notypeof:  true,
                plusplus:  false,
                quotmark:  true,
                regexp:    true,
                strict:    true,
                trailing:  true,
                undef:     true,
                unused:    true,
                // environments
                browser:   true,
                globals:   { jQuery: true },
                devel:     true  // dev only
            },
            all: [ 'slider.js' ]
        },
		watch : {
			css: {
				files: 'slider.less',
				tasks: 'less'
			},
			js: {
				files: 'slider.js',
				tasks: ['jshint', 'uglify']
			}
		}
	});
	
	grunt.registerTask('default', ['uglify', 'less']);
};