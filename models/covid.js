const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const covidSchema = new Schema({
  bodyTemperature: [
    {
      temperature: { type: Number },
      date: { type: Date },
      time: { type: String },
      managerId: { type: String },
    },
  ],
  vaccineInfo: [
    {
      nameVaccine: { type: String },
      date: { type: Date },
    },
  ],
  infectCovidInfo: [
    {
      datePositive: { type: Date },
      dateRecover: { type: Date },
    },
  ],
  staffId: {
    type: Schema.Types.ObjectId,
    ref: 'staff',
    required: true,
  },
});

module.exports = mongoose.model('covid', covidSchema);
