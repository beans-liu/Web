const Follow = require("../../models/follow");
const { errorResponser } = require("../../libs/controller-helper");

module.exports = async ctx => {
  const {
    request: {
      query: { followeeId }
    },
    currentUser
  } = ctx;

  const followerId = currentUser.id;
  const result = await Follow.getAllFollow({ followerId });
  const isAlreadyFollowing = result.some(
    item => item.followee_id === followeeId
  );
  if (!isAlreadyFollowing) {
    ctx.body = "Not following";
    return;
  }

  try {
    await Follow.unfollowUser({
      followeeId,
      followerId
    });
    ctx.body = "success";
    return true;
  } catch (error) {
    console.log(error);
    return errorResponser(ctx, 401, "Unfollow error");
  }
};
