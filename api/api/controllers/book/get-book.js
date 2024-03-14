const Book = require("../../models/books");
const { errorResponser } = require("../../libs/controller-helper");

module.exports = async ctx => {
  const {
    request: {
      query: { bookId }
    }
  } = ctx;

  try {
    const result = await Book.getBookById({ bookId });
    const pics = await Book.getPicInBook({ bookId });
    ctx.body = {
      bookInfo: result,
      picInfo: pics
    };
    // console.log(ctx.body);
  } catch (error) {
    console.log(error);
    return errorResponser(ctx, 400, "Get book info error");
  }
};
