const Staff = require('../models/staff')

exports.getIndex = (req, res, next) => {
    res.render("homepage", {
        pageTitle: 'Trang chủ',
        path: "/"

    })
}