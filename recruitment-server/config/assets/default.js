'use strict';

module.exports = {
  server: {
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/**/*.js'],
    models: 'modules/*/models/**/*.js',
    routes: ['modules/!(core)/routes/**/*.js','modules/core/routes/**/*.js'],
    config: 'modules/*/config/*.js',
    policies: 'modules/*/policies/*.js',
    views: 'modules/*/views/*.html'
  }
};
