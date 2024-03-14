const Book = require("../../models/books");
const { errorResponser } = require("../../libs/controller-helper");

module.exports = async ctx => {
  const {
    request: {
      query: { bookId }
    },
    currentUser
  } = ctx;

  try {
    const bookData = await Book.getBookById({ bookId });

    // check author user_id
    if (currentUser.id !== bookData[0].user_id) {
      return errorResponser(ctx, 401, "Delete book info error");
    }

    // check if book exists
    if (bookData.length === 0) {
      return errorResponser(ctx, 401, "Delete book info error");
    }
    const result = await Book.deleteBook({ bookId });
    ctx.body = {
      result: result
    };
    // console.log(ctx.body);
  } catch (error) {
    console.log(error);
    return errorResponser(ctx, 401, "Delete book info error");
  }
};
