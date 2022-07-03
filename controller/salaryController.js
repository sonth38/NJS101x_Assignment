const Methods = require('../util/method');
const Staff = require('../models/staff');
const WorkTime = require('../models/workTime');

// const ITEMS_PER_PAGE = 1;
/*
exports.getIndex = (req, res, next) => {
  WorkTime.find()
    .then(workTime => {
      console.log(workTime);
    })
    .catch(err => console.log(err));
  const timeWorked = Methods.calculateTimeWorked(
    req.staff
  ).totalTimeWorked.toFixed(2);
  const overTime = Methods.overTime(req.staff).overTime;
  const workTimesLastDay = Methods.overTime(req.staff).workTimesLastDay;
  const totalTimeWorkEach = Methods.overTime(req.staff).totalTimeWorkEach;

  const page = req.query.page;

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
    manager: req.staff.manager[0],
  });
};
*/

exports.getIndex = (req, res, next) => {
  let ITEMS_PER_PAGE = +req.query.line || 1

  const page = +req.query.page || 1;
  let totalItems;

  WorkTime.find()
    .count()
    .then(numTimes => {
      totalItems = numTimes;
      return WorkTime.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(workTime => {
      const timeWorked =
        Methods.calculateTimeWorked(workTime).totalTimeWorked.toFixed(2);
      const overTime = Methods.overTime(workTime).overTime;
      const workTimesLastDay = Methods.overTime(workTime).workTimesLastDay;
      const totalTimeWorkEach = Methods.overTime(workTime).totalTimeWorkEach;

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
        manager: req.staff.manager[0],
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        line: ITEMS_PER_PAGE
      });
    })
    .catch(err => console.log(err));
};

/*
exports.postSalary = (req, res, next) => {
  const timeWorked = Methods.calculateTimeWorked(
    req.staff
  ).totalTimeWorked.toFixed(2);
  const overTime = Methods.overTime(req.staff).overTime;
  const workTimesLastDay = Methods.overTime(req.staff).workTimesLastDay;
  const totalTimeWorkEach = Methods.overTime(req.staff).totalTimeWorkEach;
  const salary = Methods.getSalary(req.body.month, req.staff).salary;
  const timeWorkSalary = Methods.getSalary(
    req.body.month,
    req.staff
  ).timeWorkSalary;

  res.render('salary/salary', {
    path: '/salary',
    pageTitle: 'Thông tin giờ làm',
    staff: req.staff,
    timeWorked,
    overTime,
    workTimesLastDay,
    totalTimeWorkEach,
    salary,
    timeWorkSalary,
    manager: req.staff.manager[0],
  });
};
*/

exports.postSalary = (req, res, next) => {
  let ITEMS_PER_PAGE = +req.query.line || 1

  const page = +req.query.page || 1;
  let totalItems;

  WorkTime.find()
    .count()
    .then(numTimes => {
      totalItems = numTimes;
      return WorkTime.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(workTime => {
      const timeWorked =
        Methods.calculateTimeWorked(workTime).totalTimeWorked.toFixed(2);
      const overTime = Methods.overTime(workTime).overTime;
      const workTimesLastDay = Methods.overTime(workTime).workTimesLastDay;
      const totalTimeWorkEach = Methods.overTime(workTime).totalTimeWorkEach;
      const salary = Methods.getSalary(
        req.body.month,
        req.staff,
        workTime
      ).salary;
      const timeWorkSalary = Methods.getSalary(
        req.body.month,
        req.staff,
        workTime
      ).timeWorkSalary;

      res.render('salary/salary', {
        path: '/salary',
        pageTitle: 'Thông tin giờ làm',
        staff: req.staff,
        timeWorked,
        overTime,
        workTimesLastDay,
        totalTimeWorkEach,
        salary,
        timeWorkSalary,
        manager: req.staff.manager[0],
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        line: ITEMS_PER_PAGE
      });
    })
    .catch(err => console.log(err));
};
