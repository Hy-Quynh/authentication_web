const { mysql } = require("../config/connect");
const fs = require("fs");

module.exports = {
  checkExist: async (email, phone) => {
    try {
      const result = await mysql.query(
        `SELECT * FROM user WHERE email='${email}' OR phone='${phone}'`
      );
      if (result?.length) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("check user exist error >>>> ", error);
      return false;
    }
  },

  userSignUp: async (
    userName,
    email,
    phone,
    address,
    password
  ) => {
    try {
      const result =
        await mysql.query(`INSERT INTO user(name, email, phone, address, password, createday) 
      VALUES('${userName}', '${email}', '${phone}', '${address}', '${password}', now())`);
      if (result) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("user sign up error >>>> ", error);
      return false;
    }
  },

  findByUsername: async (username) => {
    try {
      const user = await mysql.query(
        `SELECT * FROM user WHERE username='${username}'`
      );
      if (user?.length) {
        return {
          status: true,
          payload: user,
        };
      }
      return { status: false };
    } catch (error) {
      return { status: false };
    }
  },

  findByUserPhone: async (phone) => {
    try {
      const user = await mysql.query(
        `SELECT * FROM user WHERE phone='${phone}'`
      );
      if (user?.length) {
        return {
          status: true,
          payload: user,
        };
      }
      return { status: false };
    } catch (error) {
      return { status: false };
    }
  },

  findByUserId: async (userID) => {
    try {
      const user = await mysql.query(
        `SELECT * FROM user WHERE user_id='${userID}'`
      );
      if (user?.length) {
        return {
          status: true,
          payload: user,
        };
      }
      return { status: false };
    } catch (error) {
      return { status: false };
    }
  },

  findUserByEmail: async (email) => {
    try {
      const user = await mysql.query(
        `SELECT * FROM user WHERE email='${email}'`
      );
      if (user?.length) {
        return {
          status: true,
          payload: user,
        };
      }
      return { status: false };
    } catch (error) {
      return { status: false };
    }
  },

  findByUserEmailAndPhone: async (email, phone) => {
    try {
      const user = await mysql.query(
        `SELECT * FROM user WHERE email='${email}' AND phone='${phone}'`
      );
      if (user?.length) {
        return {
          status: true,
        };
      }
      return { status: false };
    } catch (error) {
      return { status: false };
    }
  },
};
