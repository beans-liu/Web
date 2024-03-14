//routes for follow
const Router = require("koa-router");
const validate = require("koa2-validation");
const Joi = require("joi");
const config = require("config");
const { verifyClerk } = require("../middleware/index");

const postFollow = require("../controllers/follow/follow-user");
const deleteFollow = require("../controllers/follow/unfollow-user");
const getFollow = require("../controllers/follow/get-follow");

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

// follow user
router.post(
  "/follow",
  validate({
    query: {
      accessToken: Joi.string().required(),
      followeeId: Joi.number().required()
    }
  }),
  verifyClerk,
  postFollow
);

// unfollow user
router.delete(
  "/follow",
  validate({
    query: {
      accessToken: Joi.string().required(),
      followeeId: Joi.number().required()
    }
  }),
  verifyClerk,
  deleteFollow
);

router.get(
  "/follow",
  validate({
    query: {
      accessToken: Joi.string().required()
    }
  }),
  verifyClerk,
  getFollow
);

module.exports = router;
