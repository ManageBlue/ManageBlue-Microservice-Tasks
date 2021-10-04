const mongoose = require('mongoose');
let Schema = mongoose.Schema;


// Models --------------------------------------------------------------------------------------------------------------

const project = new Schema({
    title: {type: String, maxlength: 64, required: true},
    description: {type: String, maxlength: 1024, required: true},
    active: {type: Boolean, required: true},
    members: {type: [Schema.Types.ObjectId], ref: 'User'}
},
    {
        timestamps: true
    });


mongoose.model('Project', project);
