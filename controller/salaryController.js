const Methods = require('../util/method')   

exports.getIndex = (req, res, next) => {
    const timeWorked = Methods.calculateTimeWorked(req.staff).totalTimeWorked
    const overTime = Methods.overTime(req.staff).overTime
    const workTimesLastDay = Methods.overTime(req.staff).workTimesLastDay
    const totalTimeWorkEach = Methods.overTime(req.staff).totalTimeWorkEach

    res.render('salary/salary', {
      path: '/salary',
      pageTitle: 'Thông tin giờ làm',
      staff: req.staff,
      timeWorked,
      overTime,
      workTimesLastDay,
      totalTimeWorkEach,
      salary: null,
      timeWorkSalary: '',
      manager: req.staff.manager[0]
    });
};

exports.postSalary = (req, res, next) => {
    const timeWorked = Methods.calculateTimeWorked(req.staff).totalTimeWorked
    const overTime = Methods.overTime(req.staff).overTime
    const workTimesLastDay = Methods.overTime(req.staff).workTimesLastDay
    const totalTimeWorkEach = Methods.overTime(req.staff).totalTimeWorkEach
    const salary = Methods.getSalary(req.body.month, req.staff).salary
    const timeWorkSalary = Methods.getSalary(req.body.month, req.staff).timeWorkSalary

    res.render('salary/salary', {
      path: '/salary',
      pageTitle: 'Thông tin giờ làm',
      staff: req.staff,
      timeWorked,
      overTime,
      workTimesLastDay,
      totalTimeWorkEach,
      salary,
      timeWorkSalary
    });
  };