const User = require("../models/users");

module.exports = async ctx => {
  const { currentUser } = ctx;

  ctx.body = currentUser;

  return true;
};
