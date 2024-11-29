const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const trainingSchema = new Schema({
    // validates that the input does not contain numbers
    name: { type: String, required: true, match: /^[^0-9]*$/ },
    
    // validates that the input does not contain numbers
    surname: { type: String, required: true, match: /^[^0-9]*$/ },
    
    // validates that the input is 10 characters long and only contains numbers
    ID: { type: String, required: true, minlength: 10, maxlength: 10, match: /^[0-9]+$/ },
    
    date: { type: Date, required: true},
    time: { type: String, required: true },
    
    // validates that the input is 15 to 19 characters long and only contains numbers
    cardNum: { type: String, required: true, minlength: 15, maxlength: 19,  match: /^[0-9]+$/ },

    cardExp: { type: String, required: true },
    
    // validates that the input is 3 characters long and only contains numbers
    cardSec: { type: String, required: true, minlength: 3, maxlength: 3,  match: /^[0-9]+$/ },
    
    currentDate: { type: Date, required: true },
    });

var training = mongoose.model('Training', trainingSchema);
module.exports = training;