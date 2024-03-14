const Save = require("../../models/save");
const Book = require("../../models/books");
const { errorResponser } = require("../../libs/controller-helper");
const { getTaipeiNowStr } = require("../../utils/index");

module.exports = async ctx => {
  const { request: { query: { bookId } = {} } = {}, currentUser } = ctx;
  const userId = currentUser.id;

  // check if bookId is already saved
  const allSaved = await Save.getAllSaved({ userId });
  const isBookAlreadySaved = allSaved.some(item => item.book_id === bookId);
  if (isBookAlreadySaved) {
    ctx.body = "Already saved";
    return;
  }

  // check if bookId exists
  const res = await Book.getBookById({ bookId });
  if (res.length === 0) {
    return errorResponser(ctx, 401, "Post saved book error");
  }

  try {
    await Save.saveBook({
      user_id: userId,
      book_id: bookId,
      saved_at: getTaipeiNowStr("YYYY-MM-DD HH:mm:ss")
    });
    ctx.body = "success";
  } catch (error) {
    console.log(error);
    return errorResponser(ctx, 401, "Post saved book error");
  }
};
