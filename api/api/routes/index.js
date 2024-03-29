const Router = require("koa-router");
const config = require("config");
const validate = require("koa2-validation");
const Joi = require("joi");

const { rejectTheRequest } = require("../utils/error");
const { auth, verifyClerk } = require("../middleware/index");

const getMyInfo = require("../controllers/get-my-info");
const register = require("../controllers/register");
const clerkRegister = require("../controllers/clerk-register");
const refreshToken = require("../controllers/refresh-token");
const createPictureForBook = require("../controllers/picture/create-picture-for-book");
const postAiPicture = require("../controllers/picture/ai-picture");

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

// 200 example and health check route
router.get("/", async ctx => {
  ctx.body = "success";
});

router.get(
  "/my/info",
  validate({
    query: {
      accessToken: Joi.string().required()
    }
  }),
  verifyClerk,
  getMyInfo
);

router.post(
  "/register",
  validate({
    body: {
      userId: Joi.string().required(),
      fullName: Joi.string(),
      email: Joi.string(),
      imageUrl: Joi.string()
    }
  }),
  register
);

router.post(
  "/token/refresh",
  validate({
    body: {
      refreshToken: Joi.string().required()
    }
  }),
  refreshToken
);

router.post(
  "clerkRegister",
  "/clerk/register",
  validate({
    query: {
      accessToken: Joi.string().required()
    },
    body: {
      type: Joi.string()
    }
  }),
  verifyClerk,
  clerkRegister
);

router.post(
  "createPictureForBook",
  "/book/:bookId/picture",
  validate({
    query: {
      accessToken: Joi.string().required()
    },
    body: {
      type: Joi.string(),
      url: Joi.string(),
      page: Joi.number().integer()
    }
  }),
  verifyClerk,
  createPictureForBook
);

// create ai picture:ok
router.post(
  "/picture/ai",
  validate({
    query: {
      accessToken: Joi.string().required()
    },
    body: {
      prompt: Joi.string().required()
    }
  }),
  verifyClerk,
  postAiPicture
);

// bad request example
router.get("/error", async () => {
  throw rejectTheRequest({
    status: 400,
    message: { message: "error", code: 404 }
  });
});

module.exports = router;
