const Book = require("../../models/books");
const { errorResponser } = require("../../libs/controller-helper");
const { getTaipeiNowStr } = require("../../utils/index");

module.exports = async ctx => {
  console.log("raw", ctx.request.body);
  const {
    request: { body: { bookId, title, brief, category, status } = {} },
    currentUser
  } = ctx;

  try {
    const userData = await Book.getBookById({ bookId });

    if (currentUser.id !== userData[0].user_id) {
      return errorResponser(ctx, 401, "Post book update error");
    }

    await Book.updateBook({
      id: bookId,
      title,
      brief,
      category,
      status,
      updated_at: getTaipeiNowStr("YYYY-MM-DD HH:mm:ss")
    });
    ctx.body = "success";
    // console.log(ctx.body);
    return true;
  } catch (error) {
    return errorResponser(ctx, 401, "Post book update error");
  }
};
