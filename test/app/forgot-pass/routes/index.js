/**
* forgotPass routes
*/

module.exports = function( app, passport, auth ) {

    var forgotPassController = require('../controllers/index.js');

    app.get('/forgot-pass', forgotPassController.forgotPass);
};