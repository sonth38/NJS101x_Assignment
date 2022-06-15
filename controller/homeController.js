// [GET]  /
exports.getIndex = (req, res, next) => {
  res.render('attendance/attendance', {
    path: '/attendance',
    pageTitle: 'Trang chủ',
  });
};