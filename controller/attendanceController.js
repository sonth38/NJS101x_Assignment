const Staff = require('../models/staff')
const Methods = require('../util/method')

// [GET]  /
exports.getIndex = (req, res, next) => {
  res.render('attendance/attendance', {
    path: '/',
    pageTitle: 'Trang chủ',
  });
};

// [GET] /check-in
exports.getCheckin = (req, res, next) => {
  Staff.findOne()
    .then(staff => {
      res.render('attendance/checkin', {
        path: '/check-in',
        pageTitle: 'Điểm danh',
        staff: staff
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// [POST] /check-in/start
exports.postCheckin = (req, res, next) => {
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
      res.redirect('/check-in/infor');
    })
    .catch(error => {
      console.log(error);
    });
};

// [GET] /check-in/infor
exports.getCheckinInfor = (req, res, next) => {
  res.render('attendance/checkinInfor', {
    path: '/attendance',
    pageTitle: 'Thông tin điểm danh',
    lastStart: Methods.getLastStart(req.staff),
    isStarted: Methods.checkinStarted(req.staff),
    staff: req.staff,
  });
};

// [POST] /check-out
exports.postCheckout = (req, res, next) => {
  const endWorkTimes = {
    working: false,
    endTime: new Date()
  }
  req.staff
    .addEndWorkTimes(endWorkTimes)
    .then(result => {
      res.redirect('/check-out/infor');
    })
    .catch(error => {
      console.log(error);
    });
}

// [GET] /check-out/infor
exports.getCheckoutInfo = (req, res, next) => {
  const timeWorked = 
    Methods.calculateTimeWorked(req.staff).totalTimeWorked
  
  res.render('attendance/checkoutInfor', {
    path: '/attendance',
    pageTitle: 'Thông tin điểm danh',
    timeWorked,
    workedInDay: Methods.calculateTimeWorked(req.staff),
    isStarted: Methods.checkinStarted(req.staff),
    staff: req.staff
  });
};

// [GET] /leave
exports.getLeave = (req, res, next) => {
  const annualLeave = req.staff.annualLeave

  res.render('attendance/leave', {
    path: '/attendance',
    pageTitle: 'Nghỉ phép',
    annualLeave: annualLeave
  })
}

// [POST] /leave
exports.postLeave = (req, res, next) => {
  req.staff
    .updateLeave({
      dateLeave: req.body.dateLeave,
      hourLeave: req.body.hourLeave,
      reasonLeave: req.body.reasonLeave,
    })
    .then(() => {
      res.redirect('/leaveInfo');
    })
    .catch(error => {
      console.log(error);
    });
};

// [GET] /check-out/infor
exports.getLeaveInfo = (req, res, next) => {
  const newsLeaveInfo = Methods.leaveInfo(req.staff)
  res.render('attendance/leaveInfo', {
    path: '/attendance',
    pageTitle: 'Đăng ký ngày nghỉ thành công',
    newsLeaveInfo: newsLeaveInfo
  });
};