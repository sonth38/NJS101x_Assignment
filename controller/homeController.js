// [GET]  /
exports.getIndex = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.redirect('/auth/login')
  }
  res.render('home/home', {
    path: '/attendance',
    pageTitle: 'Trang chủ',
    isAuthenticated: req.session.isLoggedIn
  });
};