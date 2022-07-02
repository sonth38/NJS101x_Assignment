const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workTimeSchema = new Schema({
    startTime: { type: Date },
    workPlace: { type: String },
    working: { type: Boolean },
    endTime: { type: Date },
    staffId: {
        type: Schema.Types.ObjectId,
        ref: 'staff',
        required: true
    }
})

module.exports = mongoose.model('WorkTime', workTimeSchema);
