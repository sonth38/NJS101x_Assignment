const Staff = require('../models/staff')
const fileHelper = require('../util/file');


exports.getIndex = (req, res, next) => {
  Staff.findById('62a6a6298d2f112f6b3956c3')
    .then(staff => {
      res.render('staff/staff_form', {
        path: '/staff',
        pageTitle: 'Thông tin cá nhân',
        staff: staff
      });
    })
    .catch(err => console.log(err))
};

exports.postStaffUpdate = (req, res, next) => {
  const image = req.file

  Staff.findById('62a6a6298d2f112f6b3956c3')
    .then(staff => {
      if (image) {
        fileHelper.deleteFile(staff.image);
        staff.image = image.path;
      }
      return staff.save().then(() => {
        console.log('UPDATED STAFF!');
        res.redirect('staff/information');
      });
    })
    .catch(err => console.log(err))
}


exports.getStaffInfo = (req, res, next) => {
  Staff.findById('62a6a6298d2f112f6b3956c3').then(staff => {
    return res.render('staff/staff_info', {
        path: '/staff',
        pageTitle: 'Thông tin cá nhân',
        staff: staff
  })
  });
}
