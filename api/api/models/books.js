const datastore = require("../../db/mainDB");

const TABLE_NAME = "books";

exports.getBookById = ({ bookId, fields = "*" }) =>
  datastore
    .select(fields)
    .from(TABLE_NAME)
    .where("id", bookId);

exports.getPicInBook = ({ bookId }) =>
  datastore
    .select("*")
    .from("pictures")
    .where("book_id", "=", bookId)
    .then(results => {
      // check if results are empty
      if (!results || results.length === 0) {
        return null;
      }
      return results;
    });

exports.postBook = async data => datastore.insert(data).into(TABLE_NAME);

exports.updateBook = async data =>
  datastore
    .update(data)
    .from(TABLE_NAME)
    .where("id", data.id);

exports.deleteBook = async ({ bookId }) =>
  datastore
    .del("*")
    .from(TABLE_NAME)
    .where("id", bookId);

exports.getBookByAuthor = ({ authorId, fields = "*" }) =>
  datastore
    .select(fields)
    .from(TABLE_NAME)
    .where("user_id", authorId);

// search book
exports.getBookByQuery = ({ query, fields = "*" }) =>
  datastore
    .select(fields)
    .from(TABLE_NAME)
    .where("title", "like", `%${query}%`)
    .orWhere("brief", "like", `%${query}%`)
    .orWhere("category", "like", `%${query}%`);

// recommend 12 book by random:ok
exports.getRandBook = ({ seed }) =>
  datastore
    .select("*")
    .from(TABLE_NAME)
    .orderByRaw(`RAND(${seed})`)
    .limit(12);

// recommend latest (pagination):ok
exports.getLatest = ({ page, pageSize = 12, fields = "*" }) =>
  datastore
    .select(fields)
    .from(TABLE_NAME)
    .orderBy("created_at", "desc")
    .limit(pageSize)
    .offset((page - 1) * pageSize);

// recommend latest by category (pagination)
exports.getLatestCategory = ({ category, page, pageSize = 12, fields = "*" }) =>
  datastore
    .select(fields)
    .from(TABLE_NAME)
    .where("category", category)
    .orderBy("created_at", "desc")
    .limit(pageSize)
    .offset((page - 1) * pageSize);
