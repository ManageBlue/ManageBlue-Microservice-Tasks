const mongoose = require('mongoose');
let Schema = mongoose.Schema;


// Functions -----------------------------------------------------------------------------------------------------------

// Round to nearest 0.5
function roundHalf(value) {
    return Math.round(value*2)/2;
}

// Round to 2 decimal places
function round(value) {
    return value.toFixed(2);
}


// Models --------------------------------------------------------------------------------------------------------------

const task = new Schema({
        title: {type: String, maxlength: 64, required: true},
        note: {type: String, maxlength: 1024, required: true},
        hours: {type: Number, min : 0.5, max : 1000000, set: roundHalf, required: true},
        hourlyRate: {type: Number, min : 0.01, max : 1000000, set: round, required: true},
        project: {type: Schema.Types.ObjectId, ref: 'Project'},
        date: {type: Date, default: Date.now()},
        contributor: {type: Schema.Types.ObjectId, ref: 'User'},
        completed: {type: Boolean, required: true},
        paid: {type: Boolean, required: true}
    },
    {
        timestamps: true
    });


mongoose.model('Task', task);
