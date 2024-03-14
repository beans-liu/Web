const { errorResponser } = require("../libs/controller-helper");
const Users = require("../models/users");
const moment = require("moment");

module.exports = async ctx => {
  const {
    request: { body: { userId, fullName, email, imageUrl, type } = {} } = {}
  } = ctx;

  const [theUser] = await Users.getUserByUserId({
    userId
  });

  if (theUser) {
    return errorResponser(ctx, 400, "The user has been register.");
  }

  await Users.insert({
    user_id: userId,
    name: fullName,
    email,
    image_url: imageUrl,
    create_at: moment()
      .utcOffset(8)
      .format("YYYY-MM-DD HH:mm:ss")
  });

  ctx.body = {
    result: "success"
  };

  return true;
};
