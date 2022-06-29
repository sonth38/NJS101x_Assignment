const Staff = require('../models/staff');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Đăng nhập',
	  isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  Staff.findById('62a6a6298d2f112f6b3956c3')
    .then(staff => {
      req.session.isLoggedIn = true;
      req.session.staff = staff;
      req.session.save(err => {
        console.log(err)
        res.redirect('/');
      })
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err)
    res.redirect('/')
  })
};
