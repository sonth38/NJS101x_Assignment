const Staff = require('../models/staff')
const Methods = require('../util/method')   

exports.getIndex = (req, res, next) => {
    const timeWorked = Methods.calculateTimeWorked(req.staff).totalTimeWorked
    const overTime = Methods.overTime(req.staff).overTime
    const workTimesLastDay = Methods.overTime(req.staff).workTimesLastDay
    const totalTimeWorkEach = Methods.overTime(req.staff).totalTimeWorkEach

    const workTimeInMonth = req.staff.leaveInfoList.filter(leaveList => {
     
        return leaveList.daysLeave.getMonth() == 5
    })

    console.log(workTimeInMonth)


    res.render('salary/salary', {
      path: '/salary',
      pageTitle: 'Thông tin giờ làm',
      staff: req.staff,
      timeWorked,
      overTime,
      workTimesLastDay,
      totalTimeWorkEach,
    });
};

exports.postSalary = (req, res, next) => {
    const timeWorked = Methods.calculateTimeWorked(req.staff).totalTimeWorked
    const overTime = Methods.overTime(req.staff).overTime
    const workTimesLastDay = Methods.overTime(req.staff).workTimesLastDay
    const totalTimeWorkEach = Methods.overTime(req.staff).totalTimeWorkEach
    const salary = Methods.getSalary(req.body.month, req.staff)

    res.render('salary/salary', {
      path: '/salary',
      pageTitle: 'Thông tin giờ làm',
      staff: req.staff,
      timeWorked,
      overTime,
      workTimesLastDay,
      totalTimeWorkEach,
    });
  };