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
      combined_file_output: {
        files: {
          'static/assets/scripts/main.js': [
            'jsx/analytics.jsx',
            'jsx/feedback.jsx',
            'jsx/list.jsx',
            'jsx/login.jsx',
            'jsx/main.jsx'
          ]
        }
      },
      dynamic_mappings: {
        files: [
          {
            expand: true,
            cwd: 'jsx/dynamic',
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
