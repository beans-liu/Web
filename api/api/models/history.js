const datastore = require("../../db/mainDB");
const TABLE_NAME = "history";

exports.getUserHistory = async ({ readerId }) =>
  datastore
    .select("*")
    .from(TABLE_NAME)
    .where("reader_id", readerId);

exports.postHistory = async data => datastore.insert(data).into(TABLE_NAME);

exports.getTrending = async () =>
  datastore
    .select("book_id")
    .count("* as num_reads")
    .from(TABLE_NAME)
    .whereRaw("DATE(created_at) = (SELECT MAX(DATE(created_at)) FROM history)")
    .groupBy("book_id")
    .orderBy("num_reads", "desc")
    .limit(1);

// SELECT book_id, COUNT(*) AS num_reads
// FROM history
// WHERE DATE(created_at) = (
//   SELECT MAX(DATE(created_at))
//   FROM history
// )
// GROUP BY book_id
// ORDER BY num_reads DESC
// LIMIT 1;

exports.getTrendCategory = async category =>
  datastore
    .select("h.book_id")
    .from("history AS h")
    .join("books AS b", "h.book_id", "b.id")
    .where("b.category", category)
    .groupBy("h.book_id", datastore.raw("DATE(h.created_at)"))
    .orderBy(datastore.raw("DATE(h.created_at)"))
    .orderBy("num_reads", "desc")
    .count("* as num_reads")
    .limit(1);
