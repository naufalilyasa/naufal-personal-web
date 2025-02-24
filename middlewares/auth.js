function checkUser(req, res, next) {
  const user = req.session.user;
  if (!user) {
    req.flash("error", "Please Login");
    return res.redirect("/login");
  }
  next();
}

function checkAuth(req, res, next) {
  console.log("req.session.clientId", req.session.clientId);
  if (!req.session || !req.session.clientId) {
    const err = new Error("You shall not pass.");
    err.statusCode = 401;
    next(err);
  }
  next();
}

module.exports = { checkUser, checkAuth };
