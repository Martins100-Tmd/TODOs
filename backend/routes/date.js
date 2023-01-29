function clock() {
  let sec = new Date().getSeconds();
  let min = new Date().getMinutes();
  let hour = new Date().getHours();
  let session = "am";
  if (hour == 0) {
    hour = 12;
  }
  if (hour > 12) {
    hour = hour - 12;
    session = "pm";
  }
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  return hour + ":" + min + ":" + sec + " " + session;
}
console.log(clock());
let dateModel = {
  day: ["Mon", "Teu", "Wed", "Thur", "Fri", "Sat", "Sun"],
  Month: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Augt",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ],
  clock: clock(),
};
function date() {
  let Y = new Date().getFullYear();
  let M = dateModel.Month[new Date().getMonth()];
  let D = dateModel.day[new Date().getDay()];
  return `${D},${M} ${Y}`;
}
console.log(date());

module.exports = { clock, date };
