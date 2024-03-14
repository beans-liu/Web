const datastore = require("../../db/mainDB");

const TABLE_NAME = "pictures";

exports.INSERT_TYPE = {
  URL: "url", // 上傳到CDN再用
  AI_URL: "ai_url", // 直接使用
  DATA: "data" // 上傳到CDN取得URL再用
};

exports.getPicById = ({ picId, fields = "*" }) =>
  datastore
    .select(fields)
    .from(TABLE_NAME)
    .where("pic_id", picId);

exports.getAllPic = ({ bookId }) =>
  datastore
    .select()
    .from(TABLE_NAME)
    .where("book_id", bookId);

exports.insertPicture = async data => datastore.insert(data).into(TABLE_NAME);

exports.getPicByBookIdAndPage = ({ bookId, page, fields = "*" }) =>
  datastore
    .select(fields)
    .from(TABLE_NAME)
    .where("book_id", bookId)
    .andWhere("page", page);

exports.deleteByPicId = async ({ picId }) =>
  datastore
    .del()
    .from(TABLE_NAME)
    .where("pic_id", picId);

exports.updatePic = async ({ picId, data }) =>
  datastore
    .update(data)
    .from(TABLE_NAME)
    .where("id", picId);
