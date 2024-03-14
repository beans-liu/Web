const Book = require("../../models/books");
const { errorResponser } = require("../../libs/controller-helper");

module.exports = async ctx => {
  const { request: { query: { search } = {} } = {} } = ctx;

  try {
    const result = await Book.getBookByQuery({ query: search });
    ctx.body = result;
    // console.log(ctx.body);
  } catch {
    return errorResponser(ctx, 404, "Get searched book error");
  }
};
