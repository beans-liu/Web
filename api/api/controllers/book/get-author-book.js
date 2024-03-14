const Book = require("../../models/books");
const { errorResponser } = require("../../libs/controller-helper");

module.exports = async ctx => {
  const {
    request: {
      query: { authorId }
    }
  } = ctx;

  try {
    const result = await Book.getBookByAuthor({ authorId });
    ctx.body = result;
    // console.log(ctx.body);
  } catch (error) {
    console.log(error);
    return errorResponser(ctx, 404, "Get book by author error");
  }
};
