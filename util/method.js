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
  checkinStarted = (staff) => {
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
}

module.exports = new Methods();
