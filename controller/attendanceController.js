const Staff = require('../models/staff')
const Methods = require('../util/method')

// [GET]  /
exports.getIndex = (req, res, next) => {
  res.render('attendance', {
    pageTitle: 'Trang chủ',
    path: '/',
  });
};

// [GET] /check-in
exports.getCheckin = (req, res, next) => {
  Staff.findOne()
    .then(staff => {
      res.render('checkin', {
        pageTitle: 'Điểm danh',
        path: '/check-in',
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
      res.redirect('/check-in/infor');
    })
    .catch(error => {
      console.log(error);
    });
};


// [GET] /check-in/infor
exports.getCheckinInfor = (req, res, next) => {
  res.render('checkinInfo', {
    path: '/attendance',
    pageTitle: 'Thông tin điểm danh',
    lastStart: Methods.getLastStart(req.staff),
    isStarted: Methods.checkinStarted(req.staff),
    staff: req.staff,
  });
};