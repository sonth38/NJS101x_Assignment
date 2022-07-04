const Staff = require('../models/staff')
const fileHelper = require('../util/file');


exports.getIndex = (req, res, next) => {
  res.render('staff/staff_form', {
    path: '/staff',
    pageTitle: 'Thông tin cá nhân',
    staff: req.staff
  });
};

exports.postStaffUpdate = (req, res, next) => {
  const staffId = req.staff._id
  const image = req.file

  Staff.findOne({ _id: staffId })
    .then(staff => {
      console.log(staff)
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
  res.render('staff/staff_info', {
        path: '/staff',
        pageTitle: 'Thông tin cá nhân',
        staff: req.staff
  })
}
