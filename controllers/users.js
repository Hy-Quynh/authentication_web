const asyncHandler = require("express-async-handler");
const user = require("../model/users");
const bcrypt = require("bcrypt");

module.exports = {
  GET_SIGNIN: asyncHandler(async (req, res) => {
    res.render("auth/login");
  }),

  GET_SIGNUP: asyncHandler(async (req, res) => {
    res.render("auth/register");
  }),

  GET_HOME:  asyncHandler(async (req, res) => {
    res.render("user/homePage");
  }),

  SIGNIN: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const found = await user.findUserByEmail(email);
    if (!found?.status) {
      return res.status(400).json({
        loginError: "Email không tồn tại",
        reason: "email",
      });
    }

    const isMatch = bcrypt.compareSync(
      password,
      found?.payload[0]?.password || ""
    );


    if (!isMatch) {
      return res.status(400).json({
        loginError: "Thông tin mật khẩu chưa chính xác",
      });
    }
    
    req.session.userID = found?.payload[0]?.user_id;
    req.session.role = "user";
    res.send({
      success: true,
      status: "Đăng nhập tài khoản thành công",
      role: "user",
    });
  }),

  SIGNUP: asyncHandler(async (req, res) => {
    const { userName, email, phone, address, password } = req.body;
    const checkExist = await user.checkExist(email, phone);
    if (checkExist) {
      return res.status(400).json({
        success: false,
        signUpError: "Email hoặc số điện thoại đã tồn tại",
      });
    }
    const hash = bcrypt.hashSync(password, 10);

    const saveUser = await user.userSignUp(
      userName,
      email,
      phone,
      address,
      hash,
    );
    if (!saveUser) {
      return res
        .status(400)
        .json({ success: false, signUpError: "Thêm tài khoản thất bại" });
    }
    res.send({ success: true, status: "Đăng kí tài khoản thành công", payload: { userName: userName, password } });
  }),

  SIGNOUT: asyncHandler(async (req, res) => {
    delete req.session.userID;
    delete req.session.role;
    res.redirect("/user/sign-in");
  }),
};
