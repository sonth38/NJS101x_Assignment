const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name: {
    type: String,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  doB: {
    type: Date,
  },
  salaryScale: {
    type: Number,
  },
  startDate: {
    type: Date,
  },
  department: {
    type: String,
    default: 'Company',
  },
  annualLeave: {
    type: Number,
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
      endTime: { type: Date }
    },
  ],
  leaveInfoList: [
    {
      dateLeave: { type: String },
      hourLeave: { type: Number },
      reasonLeave: { type: String },
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

// Thêm giờ điểm danh
staffSchema.methods.addWorkTimes = function (newWorkTimes) {
  if (this.workTimes[this.workTimes.length - 1].endTime === null) {
    return this.save();
  }
  const updateWorkTimes = [...this.workTimes];
  updateWorkTimes.push(newWorkTimes);
  this.workTimes = updateWorkTimes;
  return this.save();
};

// Thêm giờ kết thúc làm
staffSchema.methods.addEndWorkTimes = function (newEndTime) {
  if (this.workTimes[this.workTimes.length - 1].endTime === null) {
    const lastWorkTime = this.workTimes[this.workTimes.length - 1];
    const updateWorkTime = (lastWorkTime.endTime = newEndTime.endTime);
    this.workTime = updateWorkTime;

    return this.save();
  } else {
    return this.save();
  }


};

// Tính số giờ nghỉ
staffSchema.methods.updateLeave = function (leaveInfo) {
  const dateLeave =leaveInfo.dateLeave  //ngày nghỉ đăng ký
  const hourLeave =leaveInfo.hourLeave  // số giờ nghỉ đăng ký
  const countdownHourAnnualLeave = this.annualLeave * 8   // số giờ nghỉ còn lại
  const singleDateLeave = dateLeave.split(',')
  console.log('annualLeave lúc trước',this.annualLeave)
  // Kiểm tra số giờ nghỉ đăng ký <= số giờ nghỉ còn lại
  // && số giờ nghỉ đăng ký <= số ngày nghỉ đăng ký * 8h 
  if (hourLeave <= countdownHourAnnualLeave && hourLeave <= singleDateLeave.length * 8) {
    this.annualLeave = this.annualLeave - hourLeave / 8
    console.log('annualLeave lúc sau',this.annualLeave)
  }

  // update leaveInfoList
  const updatedLeaveInfoList = [...this.leaveInfoList];
  updatedLeaveInfoList.push(leaveInfo);
  this.leaveInfoList = updatedLeaveInfoList;
  return this.save();
};

// Cập nhật ảnh đại diện
staffSchema.methods.updateImageStaff = function(image) {
  this.image = image
  return this.save()
}

// Cập nhật thân nhiệt
staffSchema.methods.updateTemperature = function(bodyTemperature) {
    if (this.bodyTemperature.length < 0) {
        return this.save();
    } else {
        const addbodyTemperature = [...this.bodyTemperature];
        addbodyTemperature.push(bodyTemperature);
        this.bodyTemperature = addbodyTemperature;
        return this.save();
    }
}

// Cập nhật thân nhiệt
staffSchema.methods.updateInjection = function(vaccineInfo) {
  const firstVaccineInfo = {nameVaccine: vaccineInfo.nameFirstVaccine, date: vaccineInfo.dateFirstVaccine}
  const secondVaccineInfo = {nameVaccine: vaccineInfo.nameSecondVaccine, date: vaccineInfo.dateSecondVaccine}
  this.vaccineInfo.push(firstVaccineInfo,secondVaccineInfo)
  return this.save()
}

// Cập nhật thông tin dương tính Covid
staffSchema.methods.updateInfect = function(infectCovidInfo) {
  if (this.infectCovidInfo.length < 0) {
      return this.save();
  } else {
      const addInfectCovidInfo = [...this.infectCovidInfo];
      addInfectCovidInfo.push(infectCovidInfo);
      this.infectCovidInfo = addInfectCovidInfo;
      return this.save();
  }
}

staffSchema.methods.showAnnualLeave = function(staff) {
  const initialAnnualLeave = 12
  const annualLeave = staff.annualLeave
  const restAnnualLeave = initialAnnualLeave - annualLeave
}

module.exports = mongoose.model('staff', staffSchema);
