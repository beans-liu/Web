const History = require("../../models/history");
const { errorResponser } = require("../../libs/controller-helper");

module.exports = async ctx => {
  const {
    query: { category }
  } = ctx;

  try {
    const result = await History.getTrendCategory(category);
    ctx.body = result;
  } catch (error) {
    console.log(error);
    return errorResponser(ctx, 401, "Get trending category book error");
  }
};
