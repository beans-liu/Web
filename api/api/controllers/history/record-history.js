const History = require("../../models/history");
const Book = require("../../models/books");
const { errorResponser } = require("../../libs/controller-helper");
const { getTaipeiNowStr } = require("../../utils/index");

module.exports = async ctx => {
  const {
    request: {
      body: { bookId }
    },
    currentUser
  } = ctx;

  try {
    //check if book exist
    let readerId;
    const res = await Book.getBookById({ bookId });
    if (res.length === 0) {
      return errorResponser(ctx, 401, "Post history error");
    }
    //not logged in
    else if (!currentUser) {
      readerId = null;
    } else {
      readerId = currentUser.id;
    }

    await History.postHistory({
      reader_id: readerId,
      book_id: bookId,
      created_at: getTaipeiNowStr("YYYY-MM-DD HH:mm:ss")
    });
    ctx.body = "success";
  } catch (error) {
    console.log(error);
    return errorResponser(ctx, 401, "Post history error");
  }
};
