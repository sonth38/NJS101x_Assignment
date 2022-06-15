exports.getIndex = (req, res, next) => {
  res.render('staff/staff_form', {
    path: '/staff',
    pageTitle: 'Thông tin cá nhân',
    staff: req.staff,
  });
};

exports.postStaffUpdate = (req, res, next) => {
  const image = req.body.image
  req.staff.updateImageStaff(image)
    .then(result => {
      res.redirect('/staff/information');
    })
    .catch(err => console.log(err))
};

exports.getStaffInfo = (req, res, next) => {
  res.render('staff/staff_info', {
    path: '/staff',
    pageTitle: 'Thông tin cá nhân',
    staff: req.staff,
  });
}
