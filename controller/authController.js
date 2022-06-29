const Staff = require('../models/staff');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Đăng nhập',
	  isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  Staff.findOne({ username: username })
    .then(staff => {
      if (!staff) {
        return res.redirect('/auth/login')
      }
      if (password == staff.password) {
        req.session.isLoggedIn = true;
        req.session.staff = staff;
        req.session.save(err => {
          console.log(err)
          res.redirect('/');
        })
      }
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
