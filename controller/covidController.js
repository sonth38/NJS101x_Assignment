const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const Staff = require('../models/staff');

// [GET]  /
exports.getIndex = (req, res, next) => {
  const managerId = req.staff._id;

  Staff.find({ managerId: managerId, position: 'staff' }).then(staffNV => {
    res.render('covid/covid', {
      path: '/covid',
      pageTitle: 'Thông tin Covid',
      alert: null,
      staff: req.staff,
      staffNV: staffNV,
    });
  });
};

// [POST]  /Temperature
/*
exports.postTemperature = (req, res, next) => {
  req.staff
    .updateTemperature(req.body)
    .then(result => {
      res.render('covid/covid', {
        path: '/covid',
        pageTitle: 'Đăng ký thân nhiệt thành công',
        alert: 'Nhiệt độ',
        staff: req.staff,
      });
    })
    .catch(err => console.log(err));
};
*/

exports.postTemperature = (req, res, next) => {
  const staffId = req.staff._id;
  const temperature = req.body.temperature;
  const date = req.body.date;
  const time = req.body.time;

  Staff.findById(staffId)
    .then(staff => {
      const bodyTemperature = {
        temperature: temperature,
        date: date,
        time: time,
        managerId: '62be552ff3b645d375b0d32b'
      };
      staff.bodyTemperature.push(bodyTemperature)
      return staff.save().then(result => {
        res.redirect('/covid')
      })
    })
    .catch(err => console.log(err));
};

// [POST]  /Injection
exports.postInjection = (req, res, next) => {
  console.log(req.body);
  req.staff
    .updateInjection(req.body)
    .then(result => {
      res.render('covid/covid', {
        path: '/covid',
        pageTitle: 'Cập nhật mũi tiêm thành công',
        alert: 'Injection',
        staff: req.staff,
      });
    })
    .catch(err => console.log(err));
};

// [POST]  /Infect
exports.postInfect = (req, res, next) => {
  req.staff
    .updateInfect(req.body)
    .then(result => {
      res.render('covid/covid', {
        path: '/covid',
        pageTitle: 'Cập nhật mũi tiêm thành công',
        alert: 'Infect',
        staff: req.staff,
      });
    })
    .catch(err => console.log(err));
};

// [GET] / :staffID   -- pdf Covid
exports.getStaffCovid = (req, res, next) => {
  const managerId = '62be552ff3b645d375b0d32b';

  const staffId = req.params.staffId;
  const fileName = 'covid-' + staffId + '.pdf';
  const filePath = path.join('data', fileName);

  Staff.findById(staffId)
    .then(staff => {
      if (staff.length < 1) {
        return console.log('Lỗi ');
      }

      const pdfDoc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'inline; filename="' + fileName + '"'
      );
      pdfDoc.pipe(fs.createWriteStream(filePath));
      pdfDoc.pipe(res);

      pdfDoc.text('Tên nhân viên: ' + staff.name);
      pdfDoc.text('Vacxin 1 ' + staff.vaccineInfo[0].nameVaccine + ' --Date: ' + staff.vaccineInfo[0].date);
      pdfDoc.text('Vacxin 2 ' + staff.vaccineInfo[1].nameVaccine + ' --Date: ' + staff.vaccineInfo[1].date);
      pdfDoc.text('Date Positive: ' + staff.infectCovidInfo[0].datePositive)
      pdfDoc.text('Date Recover: ' + staff.infectCovidInfo[0].dateRecover)
      pdfDoc.end();

      //   fs.readFile(filePath, (err, data) => {
      //     if (err) {
      //       return console.log(err);
      //     }
      //     res.setHeader('Content-Type', 'application/pdf');
      //     res.setHeader(
      //       'Content-Disposition',
      //       'inline; filename="' + fileName + '"'
      //     );
      //     res.send(data);
      //   });
    })
    .catch(err => console.log(err));
};
