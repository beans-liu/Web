const Follow = require("../../models/follow");
const { errorResponser } = require("../../libs/controller-helper");

module.exports = async ctx => {
  const { currentUser } = ctx;
  try {
    const followerId = currentUser.id;
    const result = await Follow.getAllFollow({
      followerId
    });
    ctx.body = result;
    // console.log(result);
  } catch (error) {
    console.log(error);
    return errorResponser(ctx, 401, "Get follow error");
  }
};
