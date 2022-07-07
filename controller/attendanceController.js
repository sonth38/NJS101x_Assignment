const Staff = require('../models/staff');
const WorkTime = require('../models/workTime');
const Methods = require('../util/method');

// [GET] /check-in
exports.getCheckin = (req, res, next) => {
  res.render('attendance/checkin', {
    path: '/attendance',
    pageTitle: 'Điểm danh',
    staff: req.staff,
    messageCheckin: ''
  });
};

// [POST] /check-in/start
/*
exports.postCheckin = (req, res, next) => {
  const staffId = req.body.staffId;
  const workPlace = req.body.workPlace;
  const newWorkTimes = {
    startTime: Date.now(),
    workPlace: workPlace,
    working: true,
    endTime: null,
  };

  req.staff
    .addWorkTimes(newWorkTimes)
    .then(result => {
      console.log(result)
      res.redirect('/attendance/check-in/infor');
    })
    .catch(error => {
      console.log(error);
    });
};
*/

exports.postCheckin = (req, res, next) => {
  const staffId = req.body.staffId;
  const workPlace = req.body.workPlace;
  WorkTime.find({ staffId: staffId }).then(workTime => {
    const lastWorkTime = workTime[workTime.length - 1]
    console.log('lastWorkTime', lastWorkTime)
    if (lastWorkTime.endTime !== null) {
      
      const newworkTime = new WorkTime({
        startTime: Date.now(),
        workPlace: workPlace,
        working: true,
        endTime: null,
        staffId: staffId,
      });
      newworkTime
        .save()
        .then(result => {
          console.log(result);
          res.redirect('/attendance/check-in/infor');
        })
        .catch(err => console.log(err));
    } else {
      console.log('Chưa checkout lần trước')
      return res.render('attendance/checkin', {
        path: '/attendance',
        pageTitle: 'Điểm danh',
        staff: req.staff,
        messageCheckin: 'Vui lòng checkout trước khi checkin'
      });
    }
  })
  
};

// [GET] /check-in/infor
/*
exports.getCheckinInfor = (req, res, next) => {
  res.render('attendance/checkinInfor', {
    path: '/attendance',
    pageTitle: 'Thông tin điểm danh',
    lastStart: Methods.getLastStart(req.staff),
    isStarted: Methods.checkinStarted(req.staff),
    staff: req.staff,
  });
};
*/

exports.getCheckinInfor = (req, res, next) => {
  WorkTime.find().then(workTime => {
    res.render('attendance/checkinInfor', {
      path: '/attendance',
      pageTitle: 'Thông tin điểm danh',
      lastStart: workTime[workTime.length - 1],
      staff: req.staff,
    });
  });
};

// [POST] /check-out
/*
exports.postCheckout = (req, res, next) => {
  const endWorkTimes = {
    working: false,
    endTime: new Date(),
  };
  req.staff
    .addEndWorkTimes(endWorkTimes)
    .then(result => {
      res.redirect('/attendance/check-out/infor');
    })
    .catch(error => {
      console.log(error);
    });
};
*/

exports.postCheckout = (req, res, next) => {
  WorkTime.find()
    .then(workTime => {
      const lastedCheckin = workTime[workTime.length - 1];
      lastedCheckin.working = false;
      lastedCheckin.endTime = new Date();

      return lastedCheckin.save().then(() => {
        console.log('UPDATED CheckOut!');
        res.redirect('/attendance/check-out/infor');
      });
    })
    .catch(err => console.log(err));
};

// [GET] /check-out/infor
/*
exports.getCheckoutInfo = (req, res, next) => {
  const timeWorked = Methods.calculateTimeWorked(req.staff).totalTimeWorked;

  res.render('attendance/checkoutInfor', {
    path: '/attendance',
    pageTitle: 'Thông tin điểm danh',
    timeWorked,
    workedInDay: Methods.calculateTimeWorked(req.staff),
    isStarted: Methods.checkinStarted(req.staff),
    staff: req.staff,
  });
};
*/

exports.getCheckoutInfo = (req, res, next) => {
  WorkTime.find()
    .then(workTime => {
      const timeWorked = Methods.calculateTimeWorked(workTime).totalTimeWorked;

      res.render('attendance/checkoutInfor', {
        path: '/attendance',
        pageTitle: 'Thông tin điểm danh',
        timeWorked: timeWorked,
        workedInDay: Methods.calculateTimeWorked(workTime),
        staff: req.staff,
      })
    })
    .catch(err => console.log(err));
};

// [GET] /leave
exports.getLeave = (req, res, next) => {
  const annualLeave = req.staff.annualLeave;

  res.render('attendance/leave', {
    path: '/attendance',
    pageTitle: 'Nghỉ phép',
    annualLeave: annualLeave,
  });
};

// [POST] /leave
exports.postLeave = (req, res, next) => {
  req.staff
    .updateLeave({
      dateLeave: req.body.dateLeave,
      hourLeave: req.body.hourLeave,
      reasonLeave: req.body.reasonLeave,
    })
    .then(() => {
      res.redirect('/attendance/leaveInfo');
    })
    .catch(error => {
      console.log(error);
    });
};

// [GET] /check-out/infor
exports.getLeaveInfo = (req, res, next) => {
  const newsLeaveInfo = Methods.leaveInfo(req.staff);
  res.render('attendance/leaveInfo', {
    path: '/attendance',
    pageTitle: 'Đăng ký ngày nghỉ thành công',
    newsLeaveInfo: newsLeaveInfo,
  });
};
