<template>
  <div class="white_area" v-if="show">
    <Bar />
    <p>首頁</p>
    <button v-on:click="handleBtnClick" id="search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="#000000"
          d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208c0-220.912-179.088-400-400-400s-400 179.088-400 400s179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0c12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z"
        ></path>
      </svg>
    </button>
  </div>
  <div class="background" v-else>
    <button v-on:click="handleBtnClick">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="3em"
        height="3em"
        viewBox="0 0 24 24"
      >
        <path
          fill="#000000"
          d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.425 12q0-.2.063-.375T4.7 11.3l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.825Z"
        ></path>
      </svg>
    </button>
    <form class="searchbox">
      <div class="searchitem">
        <svg
          id="search"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 1024 1024"
        >
          <path
            fill="#000000"
            d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208c0-220.912-179.088-400-400-400s-400 179.088-400 400s179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0c12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z"
          ></path>
        </svg>
        <input id="searchtext" placeholder="搜尋作品、作者名稱..." />
      </div>
    </form>
  </div>
  <b><h3>推薦</h3></b>
  <div class="display">
    <div class="left" @mouseover="hover = true" @mouseleave="hover = false">
      <div v-if="hover">
        <button @click="nextrecommendBook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m7.825 12l3.875 3.9q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T5.426 12q0-.2.063-.375T5.7 11.3l4.6-4.6q.275-.275.688-.287t.712.287q.275.275.275.7t-.275.7L7.825 12Zm6.6 0l3.875 3.9q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T12.026 12q0-.2.063-.375t.212-.325l4.6-4.6q.275-.275.688-.287t.712.287q.275.275.275.7t-.275.7L14.425 12Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <BooksPicArea :currentIndex="recommendIndex" category="recommend" />
    <BooksPicArea :currentIndex="recommendIndex + 1" category="recommend" />
    <BooksPicArea :currentIndex="recommendIndex + 2" category="recommend" />
    <BooksPicArea :currentIndex="recommendIndex + 3" category="recommend" />
    <BooksPicArea :currentIndex="recommendIndex + 4" category="recommend" />
    <div class="right" @mouseover="hoverr = true" @mouseleave="hoverr = false">
      <div v-if="hoverr">
        <button @click="nextrecommendBook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9.575 12L5.7 8.1q-.275-.275-.288-.687T5.7 6.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.687.288T5.7 17.3q-.275-.275-.275-.7t.275-.7L9.575 12Zm6.6 0L12.3 8.1q-.275-.275-.288-.687T12.3 6.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.687.288T12.3 17.3q-.275-.275-.275-.7t.275-.7l3.875-3.9Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <hr />
  <b><h3>熱門</h3></b>
  <div class="display">
    <div
      class="left"
      @mouseover="hoverhot = true"
      @mouseleave="hoverhot = false"
    >
      <div v-if="hoverhot">
        <button @click="nexthotBook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m7.825 12l3.875 3.9q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T5.426 12q0-.2.063-.375T5.7 11.3l4.6-4.6q.275-.275.688-.287t.712.287q.275.275.275.7t-.275.7L7.825 12Zm6.6 0l3.875 3.9q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T12.026 12q0-.2.063-.375t.212-.325l4.6-4.6q.275-.275.688-.287t.712.287q.275.275.275.7t-.275.7L14.425 12Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <BooksPicArea :currentIndex="hotIndex" category="hot" /><BooksPicArea
      :currentIndex="hotIndex + 1"
      category="hot"
    /><BooksPicArea :currentIndex="hotIndex + 2" category="hot" />
    <BooksPicArea :currentIndex="hotIndex + 3" category="hot" />
    <BooksPicArea :currentIndex="hotIndex + 4" category="hot" />
    <div
      class="right"
      @mouseover="hoverhotr = true"
      @mouseleave="hoverhotr = false"
    >
      <div v-if="hoverhotr">
        <button @click="nexthotBook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9.575 12L5.7 8.1q-.275-.275-.288-.687T5.7 6.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.687.288T5.7 17.3q-.275-.275-.275-.7t.275-.7L9.575 12Zm6.6 0L12.3 8.1q-.275-.275-.288-.687T12.3 6.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.687.288T12.3 17.3q-.275-.275-.275-.7t.275-.7l3.875-3.9Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <hr />
  <b><h3>追蹤</h3></b>
  <div class="display">
    <div
      class="left"
      @mouseover="hoverfollow = true"
      @mouseleave="hoverfollow = false"
    >
      <div v-if="hoverfollow">
        <button @click="nextBook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m7.825 12l3.875 3.9q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T5.426 12q0-.2.063-.375T5.7 11.3l4.6-4.6q.275-.275.688-.287t.712.287q.275.275.275.7t-.275.7L7.825 12Zm6.6 0l3.875 3.9q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T12.026 12q0-.2.063-.375t.212-.325l4.6-4.6q.275-.275.688-.287t.712.287q.275.275.275.7t-.275.7L14.425 12Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <BooksPicArea
      :currentIndex="currentIndex"
      ref="booksComponent"
      :category="following"
    /><BooksPicArea
      :currentIndex="currentIndex + 1"
      :category="following"
    /><BooksPicArea :currentIndex="currentIndex + 2" :category="following" />
    <BooksPicArea :currentIndex="currentIndex + 3" :category="following" />
    <BooksPicArea :currentIndex="currentIndex + 4" :category="following" />
    <div
      class="right"
      @mouseover="hoverfollowr = true"
      @mouseleave="hoverfollowr = false"
    >
      <div v-if="hoverfollowr">
        <button @click="nextrecommendBook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9.575 12L5.7 8.1q-.275-.275-.288-.687T5.7 6.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.687.288T5.7 17.3q-.275-.275-.275-.7t.275-.7L9.575 12Zm6.6 0L12.3 8.1q-.275-.275-.288-.687T12.3 6.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.687.288T12.3 17.3q-.275-.275-.275-.7t.275-.7l3.875-3.9Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@import "~/assets/index.css";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500&family=Zen+Dots&display=swap");
</style>

<script>
import { useUser } from "vue-clerk";
import BooksPicArea from "~/components/BooksPicArea.vue";
import { useUserStore } from "~/store/index.js";

export default {
  layout: "default",
  data() {
    return {
      show: true,
      currentIndex: 0,
      recommendIndex: 0,
      hotIndex: 0,
      hover: false,
      hoverr: false,
      hoverhot: false,
      hoverhotr: false,
      hoverfollow: false,
      hoverfollowr: false
    };
  },
  methods: {
    handleBtnClick() {
      this.show = !this.show;
    },
    nextBook() {
      if (this.currentIndex == 0) {
        this.currentIndex = 3;
      } else {
        this.currentIndex = 0;
      }
    },
    nextrecommendBook() {
      if (this.recommendIndex == 0) {
        this.recommendIndex = 3;
      } else {
        this.recommendIndex = 0;
      }
    },
    nexthotBook() {
      if (this.hotIndex == 0) {
        this.hotIndex = 3;
      } else {
        this.hotIndex = 0;
      }
    }
  },
  components: {
    BooksPicArea
  },
  async mounted() {
    const { user } = await useUser();
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
          useUserStore().updateUserData(user.value?.data);
          const userDataRef = useUserStore();
        } else {
          if (userDataRef.userdata) {
            useUserStore().RemoveUserDataFromLocalStorage(user.value?.data);
          }
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

    // TODO: 有登入以後使用者資料在這裡，基本上用userId去拿資料庫資料

    // if (user) {
    //   const currentPath = computed(()=>user.value);
    //   console.log('currentPath', currentPath.value);
    //   console.log(user, user._get(), computed(user));
    //   console.log(toRaw(user.value));
    //   console.log('Do Register', userId, fullName, emailAddress)
    //   console.log('user?.value', user?.value);
    // }
  }
};
</script>
