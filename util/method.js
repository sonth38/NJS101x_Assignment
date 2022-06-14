class Methods {
  // Lấy ra địa điểm checkin lần cuối
  getLastStart = staff => {
    let lastWorked;
    const lastWorkedList = staff.workTimes.filter(workedTime => {
      return workedTime.working === true;
    });
    return (lastWorked = lastWorkedList[lastWorkedList.length - 1]);
  };

  //   Lấy thời điểm checkin lần cuối
  checkinStarted = staff => {
    if (staff.workTimes && staff.workTimes.length > 0) {
      const workTimeLength = staff.workTimes.length - 1;
      const lastStart = staff.workTimes[workTimeLength];
      if (lastStart.endTime) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  // Tính thời gian làm việc
  calculateTimeWorked = staff => {
    let totalTimeWorked = 0;
    const workTimeInDay = [];
    const WorkTimesLength = staff.workTimes.length;
    let day = staff.workTimes[WorkTimesLength - 1].startTime.getDate();

    // Lấy ra được các thời điểm checkin trong ngày
    staff.workTimes.forEach(workTime => {
      if (day === workTime.startTime.getDate()) {
        workTimeInDay.push(workTime);
      }
      return workTimeInDay;
    });

    workTimeInDay.forEach(workTime => {
      // Tính số giờ làm việc
      const minutesStart =
        workTime.startTime.getHours() * 60 + workTime.startTime.getMinutes();
      const minutesEnd =
        workTime.endTime.getHours() * 60 + workTime.endTime.getMinutes();
      const totalHourCalculate = (minutesEnd - minutesStart) / 60;

      return (totalTimeWorked = totalTimeWorked + totalHourCalculate);
    });

    return { totalTimeWorked, workTimeInDay, day };
  };

  // Lấy thông tin xin nghỉ
  leaveInfo = staff => {
    const LeaveInfoLength = staff.leaveInfoList.length
    const newsLeaveInfo = staff.leaveInfoList[LeaveInfoLength - 1]
    return newsLeaveInfo
  }
}

module.exports = new Methods();
