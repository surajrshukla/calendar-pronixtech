const uniqid = require('uniqid');
const month = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"
];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


const colors = {
  blue: "#74bcfc",
  ivory: "#ae6857",
  grey: "#686568"
}

/** 
 * @param {Number} day
 * @returns {String}
 */
const getDay = (day) => {
  return weekdays[day];
}

/** 
 * @param {Number} year
 * @param {Number} month
 * @returns {Number}
 */
const getDaysInMonth = (year, month) => {

    return new Date(year, month + 1, 0).getDate();
}

/** 
 * @param {Number} currentMonth
 * @param {Number} currentYear
 * @returns {Number}
 */
const getDaysInLastMonth = (currentMonth, currentYear) => {
  const lastMonth = month.indexOf(currentMonth) === 0 ? 12 : month.indexOf(currentMonth) - 1;
  const lastYear = month.indexOf(currentMonth) === 0 ? currentYear - 1 : currentYear;
  const daysinLastMonth = getDaysInMonth(lastYear, lastMonth);
  return daysinLastMonth
}

/** 
 * @param {Number} currentMonth
 * @param {Number} currentYear
 * @returns {Object}
 */
const previousMonthDays = (currentMonth, currentYear, day) => {
  const daysinLastMonth = getDaysInLastMonth(currentMonth, currentYear);
  const lastMonth = month.indexOf(currentMonth) === 0 ? 12 : month.indexOf(currentMonth) - 1;
  const lastYear = month.indexOf(currentMonth) === 0 ? currentYear - 1 : currentYear;
  const weekDayOfFirstDayOfMonth = getDay(day - 1);
  const listOfDaysToSkip = [];

  for (let i = daysinLastMonth; i > daysinLastMonth - weekdays.indexOf(weekDayOfFirstDayOfMonth); i--) {
    listOfDaysToSkip.push({
      date: `${i} ${lastMonth} ${lastYear}`,
      dayOfMonth: i,
      isCurrentMonth: false
    });
  }

  return listOfDaysToSkip.reverse()
}

/** 
 * @param {Number} currentMonth
 * @param {Number} currentYear
 * @returns {Object}
 */
const createDaysForCurrentMonth = (daysInCurrentMonth, currentMonth, currentYear) => {
  const currenntMonthDays = Array.from(Array(daysInCurrentMonth).keys()).map((day) => {
    return {
      id: uniqid(),
      date: `${day + 1} ${currentMonth} ${currentYear}`,
      dayOfMonth: day + 1,
      isCurrentMonth: true,
      reminders: []
    };
  });
  return currenntMonthDays;
}

/** 
 * @param {Number} hour
 * @param {Number} minute
 * @returns {String}
 */
const parseTime = (hour, minute) => {
  hour = hour.toString().length === 2 ? hour : `0${hour}`;
  minute = minute.toString().length === 2 ? minute : `0${minute}`;

  return `${hour}:${minute}`
}

exports.month = month;
exports.weekdays = weekdays;
exports.getDay = getDay;
exports.getDaysInMonth = getDaysInMonth;
exports.colors = colors;
exports.previousMonthDays = previousMonthDays;
exports.createDaysForCurrentMonth = createDaysForCurrentMonth;
exports.parseTime = parseTime;