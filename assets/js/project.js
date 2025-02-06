let projects = [];

function submitProjectForm(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let nodeJs = document.getElementById("nodeJs").value;
  let nextJs = document.getElementById("nextJs").value;
  let reactJs = document.getElementById("reactJs").value;
  let typescript = document.getElementById("typescript").value;
  let description = document.getElementById("description").value;
  let image = document.getElementById("image");

  imageFileName = URL.createObjectURL(image.files[0]);

  let project = {
    name: name,
    startDate: startDate,
    endDate: endDate,
    description: description,
    image: imageFileName,
  };

  projects.push(project);

  renderProject();
}

function renderProject() {
  let projectListElement = document.getElementById("projectList");

  for (let i = 0; i < projects.length; i++) {
    projectListElement.innerHTML += `
      <div class="project-list">
          <div class="project-container">
            <img src="${projects[i].image}" alt="" />
            <h2>${projects[i].name}</h2>
            <p>durasi 3 bulan</p>
            <p>
              ${projects[i].description}
            </p>
            <div>icon</div>
            <div>
              <button>edit</button>
              <button>delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

function formatDateToWIB() {
  let date = new Date();
  // 01 Feb 2025 11:22 WIB
  let monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
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

  let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`;

  return formattedDate;
}

function getRelativeTime(postTime) {
  let now = new Date();
  console.log("WAKTU SEKARANG :", now);

  console.log("WAKTU USER POST :", postTime);

  let diffTime = now - postTime;
  console.log("selisih waktu :", diffTime);

  let diffInSeconds = Math.floor((now - postTime) / 1000);
  console.log("selisih detik", diffInSeconds);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  let diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  let diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  let diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }

  let diffInMonth = Math.floor(diffInDays / 30);
  return `${diffInMonth} month${diffInMonth === 1 ? "" : "s"} ago`;
}
