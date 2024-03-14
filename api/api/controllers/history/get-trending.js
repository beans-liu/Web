const History = require("../../models/history");
const { errorResponser } = require("../../libs/controller-helper");

module.exports = async ctx => {
  try {
    const result = await History.getTrending();
    ctx.body = result;
  } catch (error) {
    console.log(error);
    return errorResponser(ctx, 401, "Get trending book error");
  }
};
