const Save = require("../../models/save");
const { errorResponser } = require("../../libs/controller-helper");

module.exports = async ctx => {
  const { request: { query: { bookId } = {} } = {}, currentUser } = ctx;
  const userId = currentUser.id;
  const saveData = await Save.getAllSaved({ userId });

  try {
    const isBookIdPresent = saveData.some(item => item.book_id === bookId);
    if (!isBookIdPresent) {
      return errorResponser(ctx, 401, "Delete saved book error");
    }

    await Save.deleteSaved({
      userId,
      bookId
    });
    ctx.body = "success";
  } catch (error) {
    console.log(error);
    return errorResponser(ctx, 401, "Delete saved book error");
  }
};
