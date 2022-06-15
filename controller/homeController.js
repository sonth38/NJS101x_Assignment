// [GET]  /
exports.getIndex = (req, res, next) => {
  res.render('home/home', {
    path: '/attendance',
    pageTitle: 'Trang chủ',
  });
};