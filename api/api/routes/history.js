//routes for history
const Router = require("koa-router");
const validate = require("koa2-validation");
const Joi = require("joi");
const config = require("config");
const { verifyClerk } = require("../middleware/index");

const router = new Router();

const postHistory = require("../controllers/history/record-history");
const getHistory = require("../controllers/history/get-history");
const getTrending = require("../controllers/history/get-trending");
const getTrendCategory = require("../controllers/history/get-trending-category");

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

// record history
router.post(
  "/history",
  validate({
    query: {
      accessToken: Joi.string()
    },
    body: {
      bookId: Joi.number().required()
    }
  }),
  //check if accessToken is provided
  async (ctx, next) => {
    const { accessToken } = ctx.request.query;
    if (accessToken) {
      await verifyClerk(ctx, next);
    } else {
      await next();
    }
  },
  postHistory
);

// get user history
router.get(
  "/history",
  validate({
    query: {
      accessToken: Joi.string().required()
    }
  }),
  verifyClerk,
  getHistory
);

// get trending book
router.get("/history/trend", getTrending);

// get trending by category
router.get(
  "/history/trend/category",
  validate({
    query: {
      category: Joi.string().required()
    }
  }),
  getTrendCategory
);

module.exports = router;
