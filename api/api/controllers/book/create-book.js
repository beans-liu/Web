const Book = require("../../models/books");
const { errorResponser } = require("../../libs/controller-helper");
const { getTaipeiNowStr } = require("../../utils/index");

module.exports = async ctx => {
  const {
    request: {
      body: { title, brief, category, status }
    },
    currentUser
  } = ctx;
  // console.log(currentUser);
  try {
    const userId = currentUser.id;

    const [id] = await Book.postBook({
      user_id: userId,
      title,
      brief,
      category,
      status,
      created_at: getTaipeiNowStr("YYYY-MM-DD HH:mm:ss")
    });

    ctx.body = {
      id
    };
    // console.log(ctx.body);
    return true;
  } catch (error) {
    console.log(error);
    return errorResponser(ctx, 400, "Create book error");
  }
};
