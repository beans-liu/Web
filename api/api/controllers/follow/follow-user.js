const Follow = require("../../models/follow");
const { errorResponser } = require("../../libs/controller-helper");
const { getTaipeiNowStr } = require("../../utils/index");

module.exports = async ctx => {
  const {
    request: {
      query: { followeeId }
    },
    currentUser
  } = ctx;

  // check if already following
  const followerId = currentUser.id;
  const result = await Follow.getAllFollow({ followerId });
  const isAlreadyFollowing = result.some(
    item => item.followee_id === followeeId
  );
  if (isAlreadyFollowing) {
    ctx.body = "Already following";
    return;
  }

  try {
    await Follow.followUser({
      followee_id: followeeId,
      follower_id: followerId,
      created_at: getTaipeiNowStr("YYYY-MM-DD HH:mm:ss")
    });
    ctx.body = "success";
    return true;
  } catch (error) {
    console.log(error);
    return errorResponser(ctx, 401, "Follow error");
  }
};
