const Koa = require("koa");
const { v4: UUID } = require("uuid");
const Logger = require("./utils/koa-logger");
const cors = require("koa2-cors");
const koaBody = require("koa-body");
require("dotenv").config();

const router = require("./routes");
const bookRouter = require("./routes/books");
const followRouter = require("./routes/follow");
const historyRouter = require("./routes/history");

const init = () => {
  const app = new Koa();

  // setup request uuid
  app.use((ctx, next) => {
    const uuid = UUID();

    ctx.uuid = uuid;
    return next();
  });
  // log for the api call
  app.use(Logger());
  // set post json limit for image upload and parse multipart body
  app.use(
    koaBody({
      jsonLimit: "200mb",
      multipart: true,
      parsedMethods: ["POST", "PUT", "PATCH", "DELETE"]
    })
  );
  // cross domain
  app.use(cors());

  // register routers
  app.use(router.routes()).use(router.allowedMethods());
  // book router
  app.use(bookRouter.routes()).use(bookRouter.allowedMethods());
  // follow router
  app.use(followRouter.routes()).use(followRouter.allowedMethods());
  // history router
  app.use(historyRouter.routes()).use(historyRouter.allowedMethods());

  return app;
};

module.exports = init;
