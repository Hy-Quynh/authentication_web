const users = require("../model/users");
const bcrypt = require("bcrypt");

module.exports = {
  checkUserPassword: async (userID, oldPassword) => {
    const found = await users.findByUserId(userID);
    if (!found?.status) return false;

    const isMatch = bcrypt.compareSync(
      oldPassword,
      found?.payload[0]?.password || ""
    );
    if (!isMatch) return false;
    return true;
  },
};
