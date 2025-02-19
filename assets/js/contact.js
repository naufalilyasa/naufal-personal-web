function submitContactForm(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let number = document.getElementById("number").value;
  let subject = document.getElementById("subject").value;
  let massege = document.getElementById("massege").value;

  let emailTo = "naufal.ilyasa7@gmail.com";
  let a = document.createElement("a");
  a.href = `mailto:${emailTo}?subject=${subject}&body=${`Hello my name ${name}, my number ${number}, my email ${email},\n ${massege}`}`;
  a.click();
}
