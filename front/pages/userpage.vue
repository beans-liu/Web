<template>
  <div>
    <div class="white_area">
      <Bar />
      <p>{{ username }}</p>
      <goback />
    </div>

    <div class="userimg">
      <img :src="userimg" />
    </div>
    <hr />
    <div class="button_zone">
      <button>發布</button>
      <button>編輯中</button>
      <button>下架</button>
    </div>
    <hr />

    <div>
      <div class="userdisplay">
        <BooksPicArea :currentIndex="currentIndex" />
        <BooksPicArea :currentIndex="currentIndex" />
        <BooksPicArea :currentIndex="currentIndex" />
      </div>
    </div>
  </div>
</template>

<style>
@import "~/assets/userpage.css";
</style>

<script>
import BooksPicArea from "~/components/BooksPicArea.vue";
import goback from "~/components/goback.vue";
import Bar from "~/components/Bar.vue";
import { useUserStore } from "~/store/index.js";
import { onMounted } from "vue";
import { useUser } from "vue-clerk";

export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  setup() {
    const username = ref("");
    const userDataRef = useUserStore();
    const userimg = ref("");
    onMounted(() => {
      const { user } = useUser();
      setTimeout(async () => {
        // 要一下子才會載入，I don't know why
        const {
          id: userId,
          fullName,
          imageUrl,
          primaryEmailAddress: { emailAddress } = {}
        } = user?.value ?? {};

        const token = useCookie("__session");

        if (userId && token) {
          const { data: user = [], status } = await useFetch("/my/info", {
            method: "GET",
            baseURL: useRuntimeConfig()?.public?.baseURL,
            query: {
              accessToken: token
            }
          });

          if (token.value) {
            if (userDataRef.userdata) {
              userDataRef.loadUserDataFromLocalStorage();
              userimg.value = userDataRef?.userdata?.imageUrl;
              username.value = userDataRef?.userdata?.name;
            } else {
              useUserStore().updateUserData(user.value?.data);
              const userDataRef = useUserStore();
              username.value = userDataRef?.userdata?.name;
              userimg.value = userDataRef?.userdata?.imageUrl;
            }
          } else {
            userDataRef.RemoveUserDataFromLocalStorage();
          }

          // 該使用者不存在在系統中，則註冊
          if (status.value !== "success") {
            const { status: registerStatus } = await useFetch("/register", {
              method: "POST",
              baseURL: useRuntimeConfig()?.public?.baseURL,
              query: {
                token
              },
              body: {
                userId,
                fullName,
                imageUrl,
                email: emailAddress
              }
            });

            // TODO: registerStatus !== 200，註冊失敗處理
          }
        }
      }, "1000");
    });
    return { username, userimg };
  }
};
</script>
