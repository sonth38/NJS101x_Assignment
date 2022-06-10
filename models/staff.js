const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  doB: {
    type: Date,
    required: true,
  },
  salaryScale: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  annualLeave: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  workPlace: {
    type: String,
    required: true,
  },
  workTimes: [
    {
      startTime: { type: Date, default: new Date() },
      workPlace: { type: String },
      working: { type: Boolean },
      endTime: { type: Date },
    },
  ],
  leaveInfoList: [
    {
      daysLeave: { type: String },
      timesLeave: { type: Number },
      reason: { type: String },
    },
  ],
  bodyTemperature: [
    {
      temperature: {
        type: Number,
      },
      date: {
        type: Date,
      },
      time: {
        type: String,
      },
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
});

module.exports = mongoose.model("user", userSchema);
