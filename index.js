
function createEmployeeRecord(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(empRowData) {
    return empRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

function createTimeOutEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

function hoursWorkedOnDate(soughtDate){
    let inTime = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outTime = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outTime.hour - inTime.hour) / 100
}

function wagesEarnedOnDate(dateSought){
    let dayWage = (hoursWorkedOnDate.call(this, dateSought) * this.payPerHour)
    return parseFloat(dayWage)
}

function allWageFor(){
    const datesToPay = this.timeInEvents.map(function(e){
        return e.date
    })

    const payable = datesToPay.reduce(function(owed, date){
        return owed + wagesEarnedOnDate.call(this, date)
    }.bind(this), 0)

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(function(record){
    return record.firstName === firstName
  })
}

function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(earned, record){
        return earned + allWagesFor.call(record)
    }, 0)
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

