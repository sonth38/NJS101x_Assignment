const Staff = require('../models/staff');

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Đăng nhập',
    isAuthenticated: false,
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  Staff.findOne({ username: username })
    .then(staff => {
      if (!staff) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/auth/login');
      }
      if (password == staff.password) {
        req.session.isLoggedIn = true;
        req.session.staff = staff;
        req.session.save(err => {
          console.log(err);
          res.redirect('/');
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Đăng ký',
    isAuthenticated: false,
    errorMessage: message,
  });
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    // return res.status(442).render('auth/signup', {
    //   pageTitle: 'Signup',
    //   path: '/signup',
    //   errorMessage: errors.array()[0].msg,
    //   oldInput: {
    //     email: email,
    //     password: password,
    //     confirmPassword: confirmPassword
    //   },
    //   validationErrors: errors.array()
    // });
  }
  const user = new User({
    username: username,
    password: password,
    workTime: { item: [] },
  });
  user
    .save()
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
    });
};
