const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name: {
    type: String
  },
  doB: {
    type: Date
  },
  salaryScale: {
    type: Number
  },
  startDate: {
    type: Date
  },
  department: {
    type: String,
    default: 'Company'
  },
  annualLeave: {
    type: Number
  },
  image: {
    type: String,
    required: true,
  },
  workTimes: [
    {
      startTime: { type: Date },
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

staffSchema.methods.addWorkTimes = function (newWorkTimes) {
  if (this.workTimes.length < 0) {
      return this.save();
  } else {
      const updateWorkTimes = [...this.workTimes];
      updateWorkTimes.push(newWorkTimes);
      this.workTimes = updateWorkTimes;
      return this.save();
  }
};

module.exports = mongoose.model("staff", staffSchema);
