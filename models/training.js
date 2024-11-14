const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const trainingSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    ID: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    cardNum: { type: String, required: true },
    cardExp: { type: String, required: true },
    cardSec: { type: String, required: true },
    currentDate: { type: Date, required: true },
    });

var training = mongoose.model('Training', trainingSchema);
module.exports = training;