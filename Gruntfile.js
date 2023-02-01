const webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {  

  // configure the tasks
  const config = {        
    webpack: {
      myConfig: webpackConfig,
    },    
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-webpack');

  // define the tasks
  grunt.registerTask('release', [
    'webpack'
  ]);
};
