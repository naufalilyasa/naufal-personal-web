const { User } = require("../models");
const bcript = require("bcrypt");

// LOGIN PAGE
function authLoginPage(req, res) {
  const user = req.session.user;

  if (!user) {
    res.render("auth-login", { user: user });
  } else {
    req.flash("warning", "Kamu sudah login");
    res.redirect("/");
  }
}

// REGISTER PAGE
function authRegisterPage(req, res) {
  const user = req.session.user;

  if (!user) {
    res.render("auth-register", { user: user });
  } else {
    req.flash("warning", "Kamu sudah login");
    res.redirect("/");
  }
}

// LOGIN
async function authLogin(req, res) {
  const { email, password } = req.body;

  const userData = await User.findOne({ where: { email } });

  if (!userData) {
    req.flash("error", "Email tidak ditemukan");
    return res.redirect("/login");
  }

  const isValidatedPassword = await bcript.compare(password, userData.password);

  if (!isValidatedPassword) {
    req.flash("error", "Password salah!");
    return res.redirect("/login");
  }

  req.session.clientId = "abc123";
  req.session.myNum = 5;
  let loggedInUser = userData.toJSON();
  req.session.user = loggedInUser;

  req.flash("success", "Berhasil Login");
  return res.redirect("/");
}

// REGISTER
async function authRegister(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    req.flash("error", "Email sudah terpakai!");
    return res.redirect("/register");
  }

  if (password !== confirmPassword) {
    req.flash("error", "password and confirm password mismatch!");
    return res.redirect("/register");
  }

  const hashedPassword = await bcript.hash(password, 10);
  const userDataInput = {
    name,
    email,
    password: hashedPassword,
  };
  console.log(userDataInput);

  const newUser = await User.create(userDataInput);

  req.flash("success", "Berhasil mendaftar silahkan login!");
  res.redirect("/login");
}

// LOGOUT
function authLogout(req, res) {
  req.session.user = null;
  res.redirect("/login");
}

module.exports = {
  authLoginPage,
  authRegisterPage,
  authLogin,
  authRegister,
  authLogout,
};
