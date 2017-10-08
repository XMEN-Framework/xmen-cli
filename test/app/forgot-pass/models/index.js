/**
* ForgotPass model
*/

var mongoose = require('mongoose');

var ForgotPassSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        typ: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('ForgotPass', ForgotPassSchema);