const Save = require("../../models/save");
const { errorResponser } = require("../../libs/controller-helper");

module.exports = async ctx => {
  const { currentUser } = ctx;

  try {
    const result = await Save.getAllSaved({ userId: currentUser.id });
    ctx.body = result;
    // console.log(result);
  } catch {
    return errorResponser(ctx, 401, "Get saved book error");
  }
};
