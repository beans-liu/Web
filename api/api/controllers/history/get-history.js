const History = require("../../models/history");
const { errorResponser } = require("../../libs/controller-helper");

module.exports = async ctx => {
  const { currentUser } = ctx;
  try {
    const readerId = currentUser.id;
    const result = await History.getUserHistory({ readerId });
    ctx.body = result;
  } catch (error) {
    console.log(error);
    return errorResponser(ctx, 401, "Get history error");
  }
};
