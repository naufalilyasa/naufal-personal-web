function passingDataToModal(id) {
  let getValue = document.getElementById(`delete${id}`).value;
  document
    .getElementById("formDeleteModal")
    .setAttribute("action", `${getValue}`);
}
