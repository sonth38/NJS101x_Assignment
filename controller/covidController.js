// [GET]  /
exports.getIndex = (req, res, next) => {
    res.render('covid/covid', {
        path: '/covid',
        pageTitle: 'Thông tin Covid',
        alert: null,
        isAuthenticated: req.session.isLoggedIn
  });
};

// [POST]  /Temperature
exports.postTemperature = (req, res, next) => {
    req.staff.updateTemperature(req.body)
        .then(result => {
            res.render('covid/covid', {
                path: '/covid',
                pageTitle: 'Đăng ký thân nhiệt thành công',
                alert: 'Nhiệt độ',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err))
};

// [POST]  /Injection
exports.postInjection = (req, res, next) => {
    console.log(req.body)
    req.staff.updateInjection(req.body)
        .then(result => {
            res.render('covid/covid', {
                path: '/covid',
                pageTitle: 'Cập nhật mũi tiêm thành công',
                alert: 'Injection',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err))
};

// [POST]  /Infect
exports.postInfect = (req, res, next) => {
    req.staff.updateInfect(req.body)
        .then(result => {
            res.render('covid/covid', {
                path: '/covid',
                pageTitle: 'Cập nhật mũi tiêm thành công',
                alert: 'Infect',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log(err))
};
