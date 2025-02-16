function projectDuration(startDate, endDate) {
  let startFormattedDate = new Date(startDate);
  let endFormattedDate = new Date(endDate);
  let totalDuration = endFormattedDate.getTime() - startFormattedDate.getTime();
  let getSeconds = Math.floor(totalDuration / 1000);
  let getMinutes = Math.floor(getSeconds / 60);
  let getHours = Math.floor(getMinutes / 60);
  let getDays = Math.floor(getHours / 24);
  let getMonths = Math.floor(getDays / 30);
  // let getYears = Math.floor(getMonths / 12);
  // let getFullYears = getMonths / 12;
  let getModuloMonths = 0;

  getMonths % 12;
  // console.log(getModuloMonths);
  // console.log(getMonths);
  if (getHours > 24) {
    if (getDays > 30) {
      return `${getMonths} bulan.`;
    }
    return `${getDays} hari.`;
  }
}

module.exports = {
  projectDuration,
};
