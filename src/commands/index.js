var commands = require('require-dir')();

module.exports = function(program, config) {
  
  // Initialize all commands
  Object.keys(commands).forEach(function(command) {
    require('./' + command)(program, config);
  }); 
};