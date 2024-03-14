const Book = require("../../models/books");
const { errorResponser } = require("../../libs/controller-helper");

module.exports = async ctx => {
  const seed = Math.random() * 100 * Math.random() * 100;
  console.log(seed);

  try {
    const result = await Book.getRandBook({ seed });
    const ids = result.map(book => {
      return book.id;
    });
    const promises = ids.map(bookId => {
      return Book.getPicInBook({ bookId }).catch(() => null);
    });
    const pics = await Promise.all(promises);
    ctx.body = {
      bookInfo: result,
      picInfo: pics
    };
    // console.log(ctx.body);
  } catch {
    return errorResponser(ctx, 404, "Get rand book error");
  }
};
