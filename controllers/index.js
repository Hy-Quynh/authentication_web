const asyncHandler = require("express-async-handler");

module.exports = {
  GET_HOME: asyncHandler(async (req, res) => {
    const { role } = req.session;
    if (role === "user") {
      res.redirect("/user/home");
    } else {
      res.redirect("/user/sign-in");
    }
  })
};
