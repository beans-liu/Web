const datastore = require("../../db/mainDB");
const TABLE_NAME = "follow";

exports.followUser = async data => datastore.insert(data).into(TABLE_NAME);

exports.unfollowUser = async ({ followerId, followeeId }) =>
  datastore
    .delete("*")
    .from(TABLE_NAME)
    .where("follower_id", followerId)
    .where("followee_id", followeeId);

exports.getAllFollow = async ({ followerId }) =>
  datastore
    .select("*")
    .from(TABLE_NAME)
    .where("follower_id", followerId);
