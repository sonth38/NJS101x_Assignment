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
    let totalTimeWorked = 0
    const workTimeInDay = []
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
      if (workTime.endTime != null) {
        const minutesStart =
          workTime.startTime.getHours() * 60 + workTime.startTime.getMinutes();
        const minutesEnd =
          workTime.endTime.getHours() * 60 + workTime.endTime.getMinutes();
        const totalHourCalculate = (minutesEnd - minutesStart) / 60;

        return (totalTimeWorked = totalTimeWorked + totalHourCalculate);
      }
    });
    return { totalTimeWorked, workTimeInDay, day };
  };

  // Lấy thông tin xin nghỉ
  leaveInfo = staff => {
    const LeaveInfoLength = staff.leaveInfoList.length
    const newsLeaveInfo = staff.leaveInfoList[LeaveInfoLength - 1]
    return newsLeaveInfo
  }

  // Tính overTime
  overTime = staff => {
    let totalTimeWorkedLastDay = 0
    let overTime = 0
    const WorkTimesLength = staff.workTimes.length;
    let lastedDay = staff.workTimes[WorkTimesLength - 1].startTime.getDate();
    
    // Lấy ra ngày làm việc gần đây nhất
    const workTimesLastDay = staff.workTimes.filter((workTime) => {
      return workTime.startTime.getDate() == lastedDay
    })
    
    // Tính tổng thời giam làm việc ngày gần đây nhất
    workTimesLastDay.forEach(workTime => {
      // Tính số giờ làm việc
      if (workTime.endTime != null) {
        const minutesStartLastDay =
          workTime.startTime.getHours() * 60 + workTime.startTime.getMinutes();
        const minutesEndLastDay =
          workTime.endTime.getHours() * 60 + workTime.endTime.getMinutes();
        const totalHourCalculateLastDay = (minutesEndLastDay - minutesStartLastDay) / 60;
        return (totalTimeWorkedLastDay = totalTimeWorkedLastDay + totalHourCalculateLastDay);
      }
    });
    if (totalTimeWorkedLastDay > 8) {
      return overTime = totalTimeWorkedLastDay - 8
    }
    return { overTime, workTimesLastDay }
  }

  getSalary = (month, staff) => {
    
    // Lấy ra workTime có tháng được chọn
    const monthNumber = Number(month)

    const workTimeInMonth = staff.workTimes.filter(workTime => {
      if (workTime.endTime !== null) {
        return (workTime.startTime.getMonth() + 1 == monthNumber)
      }
    })
    
    console.log(workTimeInMonth)
    // Tổng số giờ nếu làm đủ
    const fullTimeWork = workTimeInMonth.length * 8
    
    // Tính tổng thời gian checkin - checkout của tháng được chọn
    let totalTimeWorked = 0
    workTimeInMonth.forEach(workTime => {
      // Tính số giờ làm việc
        const minutesStart =
          workTime.startTime.getHours() * 60 + workTime.startTime.getMinutes();
        const minutesEnd =
          workTime.endTime.getHours() * 60 + workTime.endTime.getMinutes();
        const totalHourCalculate = (minutesEnd - minutesStart) / 60;
        return (totalTimeWorked = totalTimeWorked + totalHourCalculate);
    });
  
    // Tổng thời gian làm đủ trừ thời gian checkin-checkout
    const timeWorkSalary = fullTimeWork - totalTimeWorked
    console.log(fullTimeWork)
    console.log(timeWorkSalary)
    return (staff.salaryScale * 3000000 + timeWorkSalary * 200000 )
  };
}

module.exports = new Methods();
