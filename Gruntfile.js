module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-react');
  
  grunt.initConfig({
    less: {
      development: {
        files: {
          'static/assets/css/main.css': 'styles/main.less'
        }
      }
    },
    react: {
      dynamic_mappings: {
        files: [
          {
            expand: true,
            cwd: 'jsx/',
            src: ['**/*.jsx'],
            dest: 'static/assets/scripts/',
            ext: '.js'
          }
        ]
      }
    },
    watch: {
      less: {
        files: ["styles/**/*.less"],
        tasks: ['less']
      },
      react: {
        files: ["jsx/**/*.jsx"],
        tasks: ['react']
      }
    }
  });

  grunt.registerTask('default', ['less', 'react', 'watch']);
};
