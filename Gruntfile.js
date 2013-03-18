module.exports = function(grunt){

  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.initConfig({
    qunit: {
      all: ["tests/*.html"]
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "lib",
          modules: [{ name: "main" }],
          optimize: 'uglify2',
          preserveLicenseComments: false,
          generateSourceMaps: true,
          dir: "tmp/"
        }
      }
    },

    copy: {
      main: {
        files: [
          { src: "tmp/main.js", dest: "dist/triforce.js" },
          { src: "tmp/*.map", dest: "dist/", flatten: true, expand: true, filter: "isFile" }
        ]
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'qunit']);
  grunt.registerTask('build', ['requirejs', 'copy']);
}
