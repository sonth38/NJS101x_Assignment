// [GET]  /
exports.getIndex = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/auth/login');
  }
  const presentMonth = new Date().getMonth() + 1;
  const monthConfirmed = req.staff.isConfirm.filter(item => {
    return item.month === presentMonth;
  });
  
  let confirmed;
  if (monthConfirmed[0]?.month === presentMonth) {
    confirmed = true;
  } else {
    confirmed = false;
  }
  res.render('home/home', {
    path: '/attendance',
    pageTitle: 'Trang chủ',
    confirmed
  });
};
