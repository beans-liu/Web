const datastore = require("../../db/mainDB");

const TABLE_NAME = "save";

exports.saveBook = async data => datastore.insert(data).into(TABLE_NAME);

exports.getAllSaved = async ({ userId }) =>
  datastore
    .select("book_id")
    .from(TABLE_NAME)
    .where("user_id", userId);

exports.deleteSaved = async ({ userId, bookId }) =>
  datastore
    .delete("*")
    .from(TABLE_NAME)
    .where("user_id", userId)
    .where("book_id", bookId);
