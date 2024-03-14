const moment = require("moment");

const cloudinary = require("cloudinary").v2;

const { errorResponser } = require("../../libs/controller-helper");

const Book = require("../../models/books");
const Picture = require("../../models/picture");

cloudinary.config({
  cloud_name: "dduxc10dr",
  api_key: "488359744273927",
  api_secret: "AQ4zFSWVSOfY5Y_eM76FquiBVsA",
  secure: true
});

module.exports = async ctx => {
  const {
    request: { body: { type = Picture.INSERT_TYPE.URL, url, page } = {} } = {},
    params: { bookId }
  } = ctx;

  let finalUrl = url;

  const cdn = await cloudinary.uploader.upload(url, {
    folder: "pbook",
    width: 300,
    height: 480,
    crop: "crop"
  });

  ({ url: finalUrl } = cdn);

  const [theBook] = await Book.getBookById({
    bookId
  });

  if (!theBook) {
    return errorResponser(ctx, 404, "The book not found.");
  }
  const [thePage] = await Picture.getPicByBookIdAndPage({
    bookId,
    page
  });

  if (thePage) {
    await Picture.updatePic({
      picId: thePage?.id,
      data: {
        book_id: bookId,
        page,
        url: finalUrl
      }
    });
  } else {
    await Picture.insertPicture({
      book_id: bookId,
      page,
      url: finalUrl,
      create_at: moment()
        .utcOffset(8)
        .format("YYYY-MM-DD HH:mm:ss")
    });
  }

  ctx.body = {
    result: "success"
  };
};
