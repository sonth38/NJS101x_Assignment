const Staff = require('../models/staff');
const WorkTime = require('../models/workTime');
const Methods = require('../util/method');

// [GET] /manageStaff

exports.getIndex = (req, res, next) => {
  Staff.find({ position: 'staff' })
    .then(staffs => {
      res.render('confirmSalary/index', {
        path: '/manageStaff',
        pageTitle: 'Xác nhận giờ làm',
        isStarted: null,
        staffs,
        staff: false,
      });
    })
    .catch(err => console.log(err));
};

// [POST] /manageStaff
exports.postStaff = (req, res, next) => {
  const staffId = req.body.staffId;

 

  WorkTime.find({ staffId: staffId })
    .then(workTime => {
      const timeWorked =
        Methods.calculateTimeWorked(workTime).totalTimeWorked.toFixed(2);
      const overTime = Methods.overTime(workTime).overTime;
      const workTimesLastDay = Methods.confirmSalary(workTime, req.body.month ).workTimesInMonth;
      const totalTimeWorkEach = Methods.overTime(workTime).totalTimeWorkEach;

      Staff.findById(staffId)
        .then(staff => {
          const presentMonth = new Date().getMonth() + 1;
          const monthConfirmed = staff.isConfirm.filter(item => {
            return item.month === presentMonth;
          });
          
          let confirmed;
          if (monthConfirmed[0]?.month === presentMonth) {
            confirmed = true;
          } else {
            confirmed = false;
          }
          res.render('confirmSalary/showSalary', {
            path: '/confirmSalary',
            pageTitle: 'Xác nhận giờ làm',
            staff: staff,
            timeWorked,
            overTime,
            workTimesLastDay,
            totalTimeWorkEach,
            month: +req.body.month,
            confirmed
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

// POST /manageStaff/postDeleteWorkTime
exports.postDeleteWorkTime = (req, res, next) => {
  workTimeId = req.body.workTime;
  WorkTime.findByIdAndRemove(workTimeId)

    .then(result => {
      console.log('Remove work time succes');
      res.redirect('/manageStaff');
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postComfirmTimeWork = (req, res, next) => {
  Staff.findById(req.body.staffId)
    .then(staff => {
      staff.isConfirm.push({
        confirmed: true,
        month: req.body.month,
      });
      staff.save();
    })
    .then(result => {
      res.redirect('/manageStaff');
    })
    .catch(error => {
      console.log(error);
    });
};
