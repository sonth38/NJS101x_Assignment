// [GET]  /
exports.getIndex = (req, res, next) => {
    res.render('covid/covid', {
        path: '/covid',
        pageTitle: 'Thông tin Covid',
        alert: null
  });
};

// [POST]  /Temperature
exports.postTemperature = (req, res, next) => {
    req.staff.updateTemperature(req.body)
        .then(result => {
            res.render('covid/covid', {
                path: '/covid',
                pageTitle: 'Đăng ký thân nhiệt thành công',
                alert: 'Nhiệt độ'
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
                alert: 'Injection'
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
                alert: 'Infect'
            });
        })
        .catch(err => console.log(err))
};
