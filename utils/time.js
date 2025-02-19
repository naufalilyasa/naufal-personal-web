function formatDateToWIB(date) {
  date = new Date(date);
  let monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  let day = date.getDate().toString().padStart(2, "0");
  let month = monthList[date.getMonth()];
  let year = date.getFullYear();

  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let formattedDate = `${
    day + " " + month + " " + year + " " + hours + ":" + minutes + " WIB "
  }`;
  // console.log(formattedDate);

  return formattedDate;
}

function getRelativeTime(postTime) {
  postTime = new Date(postTime);
  let now = new Date();
  let diffTime = now - postTime;

  let diffInSeconds = Math.floor(diffTime / 1000);
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  let diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  let diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 60) {
    return `${diffInHours} hours ago`;
  }

  let diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 60) {
    return `${diffInDays} days ago`;
  }

  let diffInMonth = Math.floor(diffInDays / 30);
  if (diffInMonth < 12) {
    `${diffInMonth} month${diffInMonth === 1 ? "" : "s"} ago`;
  }

  let diffInYears = Math.floor(diffInMonth / 12);
  return `${diffInYears} years ago`;
}

module.exports = {
  formatDateToWIB,
  getRelativeTime,
};
