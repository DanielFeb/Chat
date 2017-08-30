module.exports = function(grunt) {

    grunt.initConfig({
        // define some directories to be used during build
        dir: {

            // location where TypeScript source files are located
            'source': 'src/',
            // location where all build files shall be placed
            'target': 'dest',

        },

        copy: {
            main: {
                expand: true,
                cwd: '<%= dir.source %>/',
                src: '**',
                dest: '<%= dir.target %>/',
            },
        },
        // ts: {
        //     default: {
        //         passThrough: true,
        //         tsconfig: './'
        //     }
        // },
        watch: {
            copy: {
                files: '<%=dir.source%>/**/*',
                tasks: ['copy:main']
            }
        },
    });

    // ----- Setup tasks

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['watch']);

};