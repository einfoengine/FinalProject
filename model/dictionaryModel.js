var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var dictionaryModel = new Schema({
    word: {
        type: String
    },
    wordType: {
        type: String
    }
});

module.exports = mongoose.model('Dictionary', dictionaryModel);