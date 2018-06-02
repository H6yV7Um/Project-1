const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
    userID: {
        type: String,
        // unique: true,
        require: true
    },
    exam: {
        order: {
            result: {type: Number}
        },
        calculator: {
            1: {type: Boolean},
            2: {type: Boolean},
            // three : {type: Boolean},
            // four: {type: Boolean},
            // five: {type: Boolean},
            // six: {type: Boolean},
            // seven: {type: Boolean},
            // eight: {type: Boolean},
            // nine: {type: Boolean},
            // ten: {type: Boolean}
        }
    },
    timestamp: {
        type: String,
        require: true,
        default: Date.now()
    },
});



module.exports = mongoose.model('Exam', ExamSchema);
