function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour) });
    return this;
}

function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour) });
    return this;
}

function hoursWorkedOnDate(targetDate) {
    const inEvent = this.timeInEvents.find(e => e.date === targetDate);
    const outEvent = this.timeOutEvents.find(e => e.date === targetDate);
    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(targetDate) {
    return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(e => e.date);
    const payable = eligibleDates.reduce((memo, date) => {
        return memo + wagesEarnedOnDate.call(this, date);
    }, 0);
    return payable;
};

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(emp => emp.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
        return total + allWagesFor.call(employee);
    }, 0);
}
