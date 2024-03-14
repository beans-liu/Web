//routes for books
const Router = require("koa-router");
const validate = require("koa2-validation");
const Joi = require("joi");
const config = require("config");
const { verifyClerk } = require("../middleware/index");

const getBookInfo = require("../controllers/book/get-book");
const postBook = require("../controllers/book/create-book");
const getBookByAuthor = require("../controllers/book/get-author-book");
const updateBook = require("../controllers/book/update-book");
const getRandBook = require("../controllers/book/get-rand-book");
const deleteBook = require("../controllers/book/delete-book");
const getLatest = require("../controllers/book/get-latest");
const getLatestCategory = require("../controllers/book/get-latest-category");
const searchBook = require("../controllers/book/search-book");
const getSavedBook = require("../controllers/book/get-saved-book");
const saveBook = require("../controllers/book/save-book");
const deleteSavedBook = require("../controllers/book/delete-save");

const router = new Router();

router.use("*", async (ctx, next) => {
  const meta = {
    version: config.api.version,
    request: {
      url: ctx.params[0],
      query: Object.assign({}, ctx.request.query, ctx.request.body)
    }
  };

  try {
    const { _url: url } = ctx.request?.body;
    if (url) {
      ctx.request.body.url = url;
    }

    await next();

    if (ctx.response.status === 200) {
      const finalBody = { data: ctx.body };

      if (Array.isArray(ctx.body)) {
        finalBody.count = ctx.body.length;
      }

      if (ctx.nextIndex) {
        finalBody.nextIndex = ctx.nextIndex;
      }

      if (ctx.totalPage) {
        finalBody.totalPage = ctx.totalPage;
      }

      finalBody.meta = meta;
      ctx.body = finalBody;
    }
    // error handling
  } catch (err) {
    if (err?.isBoom) {
      ctx.status = err.output.statusCode;
      ctx.body = {
        error: err.output.payload.error,
        message: err.message
      };
    } else {
      ctx.status = err?.status || 500;
      ctx.body = {
        message: err?.message || "Something wrong."
      };
      if (ctx.status === 500) {
        ctx.body.error = "Internal Server Error";
      }
      ctx.app.emit("error", err, ctx);
    }
  }
});

// create new book:ok
router.post(
  "/books",
  validate({
    query: {
      accessToken: Joi.string().required()
    },
    body: {
      title: Joi.string().required(),
      brief: Joi.string().allow([null]),
      category: Joi.string().allow([null]),
      status: Joi.string().allow([null])
    }
  }),
  verifyClerk,
  postBook
);

// get book info:ok
router.get(
  "/books",
  validate({
    query: {
      bookId: Joi.number().required()
    }
  }),
  getBookInfo
);

// get book by author:ok
router.get(
  "/books/author",
  validate({
    query: {
      authorId: Joi.number().required() //id of users
    }
  }),
  getBookByAuthor
);

// delete book:ok
router.delete(
  "/books",
  validate({
    query: {
      accessToken: Joi.string().required(),
      bookId: Joi.number().required()
    }
  }),
  verifyClerk,
  deleteBook
);

// update book info:ok
router.put(
  "/books",
  validate({
    query: {
      accessToken: Joi.string().required()
    },
    body: {
      bookId: Joi.number().required(),
      title: Joi.string(),
      brief: Joi.string().allow([null]),
      category: Joi.string().allow([null]),
      status: Joi.string().allow([null])
    }
  }),
  verifyClerk,
  updateBook
);

// seatch book by query:ok
router.get(
  "/books/search",
  validate({
    query: {
      search: Joi.string().required()
    }
  }),
  searchBook
);

// recommend 12 book by random:ok
router.get("/books/rand", getRandBook);

// recommend latest books (pagination):ok
router.get(
  "/books/latest",
  validate({
    query: {
      page: Joi.number().required()
    }
  }),
  getLatest
);

// recommend latest books by category (pagination):ok
router.get(
  "/books/latest-category",
  validate({
    query: {
      category: Joi.string().required(),
      page: Joi.number().required()
    }
  }),
  getLatestCategory
);

// save book:ok
router.post(
  "/books/save",
  validate({
    query: {
      accessToken: Joi.string().required(),
      bookId: Joi.number().required()
    }
  }),
  verifyClerk,
  saveBook
);

// get saved book:ok
router.get(
  "/books/save",
  validate({
    query: {
      accessToken: Joi.string().required()
    }
  }),
  verifyClerk,
  getSavedBook
);

// delete saved book:ok
router.delete(
  "/books/save",
  validate({
    query: {
      accessToken: Joi.string().required(),
      bookId: Joi.number().required()
    }
  }),
  verifyClerk,
  deleteSavedBook
);

module.exports = router;
