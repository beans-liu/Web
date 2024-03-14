export default defineNuxtRouteMiddleware(async () => {
  // 完成註冊以後用 Token 去拿資料
  const token = useCookie("__session");
  console.log("token", token.value);
});
