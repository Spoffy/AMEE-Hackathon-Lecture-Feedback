module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.initConfig({
    less: {
      development: {
        files: {
          'static/assets/css/main.css': 'styles/main.less'
        }
      }
    },
    watch: {
      less: {
        files: ["styles/**/*.less"],
        tasks: ['less']
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};
